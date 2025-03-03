import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface DataItem {
  id: string
  origId: string
  text: string
  estimatedStayTime?: string
}

interface DataStructure {
  [key: string]: DataItem[]
}

// Define time slots from 08:00 to 24:00
const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const startHour = 8 + i
  const endHour = startHour + 1
  return `${startHour}:00 - ${endHour}:00`
})

export const exportToExcel = (data: DataStructure) => {
  // Extract days (columns)
  const days = Object.keys(data)

  // Prepare worksheet data
  const sheetData: (string | undefined)[][] = []

  // First row: headers (time slots + days)
  sheetData.push(['Time Slot', ...days])

  // Fill in time slots with data
  timeSlots.forEach((slot, index) => {
    const row: (string | undefined)[] = [slot]

    days.forEach((day) => {
      // Get the corresponding data for the current time slot
      const item = data[day][index] // Ensure index alignment
      const displayItem = item?.text
        ? item.text
        : !item.id.includes('empty')
          ? '同上'
          : ''
      row.push(displayItem || '') // Fill empty if no data
    })

    sheetData.push(row)
  })

  // Create a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedule')

  // Convert workbook to binary data
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // Create a Blob and trigger the download
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(dataBlob, 'schedule.xlsx')
}
