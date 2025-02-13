import TourDetail from '../../../helper/report-parser-content/reports/tours-parser/tour-detail'
export const tourParser = (rawData: any[]): TourDetail[] => {
  const keys = Object.keys(rawData[0])
  return rawData.map((item: any, index) => {
    return {
      id: item[keys[0]],
      name: item[keys[1]],
      info: item[keys[2]],
      special: item[keys[3]],
      price: item[keys[4]],
      openDate: item[keys[5]],
      openingHours: item[keys[6]],
      location: item[keys[7]],
      transportation: item[keys[8]],
      commuteTime: item[keys[9]] || '',
      estimatedStayTime: item[keys[10]] || '',
      image1: item[keys[11]] || '',
      image2: item[keys[12]] || '',
      isLike: false,
    }
  })
}
