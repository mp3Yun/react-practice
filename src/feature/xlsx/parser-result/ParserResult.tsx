import TouristSpotsList from '../components/tourist-spots/TouristSpotsList'
import { Strategy } from '../strategy/ParserFactory'

// 工廠模式根據策略返回對應的元件
export const resultComponentMap: Record<Strategy, React.FC<{ data: any[] }>> = {
  tours: TouristSpotsList,
  hotels: TouristSpotsList, // TODO: 要改
}
