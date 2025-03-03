import * as XLSX from 'xlsx'
import { SpotDetailValue } from '../../components/tourist-spots/TouristSpotItem'
import { HotelDetailValue } from '../../components/hotels/HotelItem'

interface ScheduleItem {
  id: string
  origId: string
  text: string
  estimatedStayTime?: string
}

interface DataStructure {
  [key: string]: ScheduleItem[]
}

// 根據 schedule 過濾出對應的 spots 和 hotels
export const filterSpotsAndHotels = (
  schedule: DataStructure,
  spots: SpotDetailValue[],
  hotels: HotelDetailValue[]
) => {
  const spotIdsInSchedule = new Set(
    Object.values(schedule)
      .flat()
      .map((item) => item.origId)
      .filter((id) => spots.some((spot) => spot.id.value === id))
  )

  const hotelIdsInSchedule = new Set(
    Object.values(schedule)
      .flat()
      .map((item) => item.origId)
      .filter((id) => hotels.some((hotel) => hotel.id.value === id))
  )

  const filteredSpots = spots.filter((spot) =>
    spotIdsInSchedule.has(spot.id.value)
  )
  const filteredHotels = hotels.filter((hotel) =>
    hotelIdsInSchedule.has(hotel.id.value)
  )

  return { filteredSpots, filteredHotels }
}

const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const startHour = 8 + i
  const endHour = startHour + 1
  return `${startHour}:00 - ${endHour}:00`
})

// 將資料匯出為 Excel
const exportToExcel = (
  schedule: DataStructure,
  spots: SpotDetailValue[],
  hotels: HotelDetailValue[]
) => {
  // 將景點資料轉換為工作表
  const spotSheetData = spots.map((spot) => ({
    [spot.id.name]: spot.id.value,
    [spot.name.name]: spot.name.value,
    [spot.info.name]: spot.info.value,
    [spot.special.name]: spot.special.value,
    [spot.price.name]: spot.price.value,
    [spot.openDate.name]: spot.openDate.value,
    [spot.openingHours.name]: spot.openingHours.value,
    [spot.location.name]: spot.location.value,
    [spot.transportation.name]: spot.transportation.value,
    [spot.commuteTime?.name || '通勤時間']: spot.commuteTime?.value,
    [spot.estimatedStayTime?.name || '預計停留時間']:
      spot.estimatedStayTime?.value,
    // image1: spot.image1?.value,
    // image2: spot.image2?.value,
    // isLike: spot.isLike.value ? '是' : '否',
  }))

  const hotelSheetData = hotels.map((hotel) => ({
    [hotel.id.name]: hotel.id.value,
    [hotel.name.name]: hotel.name.value,
    [hotel.info.name]: hotel.info.value,
    [hotel.special.name]: hotel.special.value,
    [hotel.price.name]: hotel.price.value,
    [hotel.checkinTime.name]: hotel.checkinTime.value,
    [hotel.checkoutTime.name]: hotel.checkoutTime.value,
    [hotel.location.name]: hotel.location.value,
    [hotel.transportation.name]: hotel.transportation.value,
    // isLike: hotel.isLike.value ? '是' : '否',
  }))

  // Extract days (columns)
  const days = Object.keys(schedule)

  // Prepare worksheet data
  const scheduleSheetData: (string | undefined)[][] = []

  // First row: headers (time slots + days)
  scheduleSheetData.push(['Time Slot', ...days])

  // Fill in time slots with data
  timeSlots.forEach((slot, index) => {
    const row: (string | undefined)[] = [slot]
    days.forEach((day) => {
      // Get the corresponding data for the current time slot
      const item = schedule[day][index] // Ensure index alignment
      console.error(day, item)
      const displayItem = item?.text
        ? item.text
        : !item.id.includes('empty')
          ? '同上'
          : ''
      row.push(displayItem || '') // Fill empty if no data
    })

    scheduleSheetData.push(row)
  })

  // 建立工作表
  const wb = XLSX.utils.book_new()
  const scheduleSheet = XLSX.utils.aoa_to_sheet(scheduleSheetData)
  const spotSheet = XLSX.utils.json_to_sheet(spotSheetData)
  const hotelSheet = XLSX.utils.json_to_sheet(hotelSheetData)

  // 加入到工作簿中
  XLSX.utils.book_append_sheet(wb, scheduleSheet, 'Schedule')
  XLSX.utils.book_append_sheet(wb, spotSheet, 'spots')
  XLSX.utils.book_append_sheet(wb, hotelSheet, 'hotels')

  // 產生 Excel 檔案並下載
  XLSX.writeFile(wb, 'schedule_with_spots_and_hotels.xlsx')
}

export default exportToExcel
