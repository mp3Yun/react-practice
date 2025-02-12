export interface Tour {
  id: number
  name: string
  info: string
  special: string
  price: number
  openDate: string
  openingHours: string
  location: string
  transportation: string
  commuteTime?: string
  image?: string
}

export const tourParser = (rawData: any[]): Tour[] => {
  const keys = Object.keys(rawData[0])
  return rawData.map((item: any, index) => {
    return {
      id: index + 1,
      name: item[keys[0]],
      info: item[keys[1]],
      special: item[keys[2]],
      price: item[keys[3]],
      openDate: item[keys[4]],
      openingHours: item[keys[5]],
      location: item[keys[6]],
      transportation: item[keys[7]],
      commuteTime: item[keys[8]] || '',
      image: item[keys[9]] || '',
    }
  })
}
