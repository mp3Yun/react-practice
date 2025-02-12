import { hotelParser } from './HotelParser'
import { tourParser } from './TourParser'

// Define the valid categories as a union type
export type Strategy = 'tours' | 'hotels'

const parserFactory: Record<Strategy, (data: any[]) => any[]> = {
  tours: tourParser,
  hotels: hotelParser,
}

export const getParser = (strategy: Strategy) => {
  return parserFactory[strategy] || ((data: any[]) => data) // 預設回傳原始資料
}
