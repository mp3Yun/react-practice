import { ReportType } from '../../../helper/report-parser-content/report-parser-context'
import HotelsList from '../components/hotels/HotelsList'
import { DisplayItem } from '../components/ResultDisplay'
import TouristSpotsList from '../components/tourist-spots/TouristSpotsList'

interface ComponentProps extends DisplayItem {
  data: any[]
}
// 工廠模式根據策略返回對應的元件
export const resultComponentMap: Record<
  ReportType,
  React.FC<ComponentProps>
> = {
  SpotsReport: TouristSpotsList,
  HotelsReport: HotelsList,
}
