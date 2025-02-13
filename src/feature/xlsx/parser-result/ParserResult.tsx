import { ReportType } from '../../../helper/report-parser-content/report-parser-context'
import TouristSpotsList from '../components/tourist-spots/TouristSpotsList'

// 工廠模式根據策略返回對應的元件
export const resultComponentMap: Record<
  ReportType,
  React.FC<{ data: any[] }>
> = {
  ToursReport: TouristSpotsList,
}
