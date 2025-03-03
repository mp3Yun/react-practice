import ParserHelper from '../../../ParserHelper'
import { ReportParserStrategy } from '../../report-parser-context'
import { DataSet, ReportInfo } from '../../report.type'
import HotelDetail from './hotel-detail'

export interface HotelsReport extends ReportInfo {}

export default class HotelsReportParser
  implements ReportParserStrategy<HotelsReport>
{
  reportName: string

  constructor(reportName: string) {
    this.reportName = reportName
  }
  parse(rawData: string[][]): HotelsReport {
    const { findValueIndex, setIndices, createDataObject } = ParserHelper

    // 從原始資料中找到欄位名稱所在的索引，使用 '' 作為查找目標
    const fieldNamesIndexObj = findValueIndex(rawData, 'id')

    if (!fieldNamesIndexObj) {
      throw new Error('找不到欄位名稱')
    }

    // 使用欄位名稱後的列作為起點，計算出 spots 的資料行索引範圍
    const detailIndices = setIndices(
      fieldNamesIndexObj.row + 1,
      rawData.length - 1
    )

    // 初始化 details 的 DataSet 物件
    const details: DataSet<HotelDetail> = { name: '', entries: [] }

    // 提取欄位名稱列，之後會用來映射資料
    const fieldNames = rawData[fieldNamesIndexObj.row]

    // 取得 TourDetail 類別中的屬性名稱
    const keys = HotelDetail.getPropKeys()

    // 將 rawData 中的每一行資料轉換為 TourDetail 物件
    rawData.forEach((row, rowIndex) => {
      // 檢查當前行索引是否在 detail 索引範圍內
      if (detailIndices.includes(rowIndex)) {
        // 將該行的原始資料轉換為 Detail 物件
        const detail = createDataObject<HotelDetail>(fieldNames, row, keys)
        // 將解析出的細節加入 Details 的 entries 陣列
        details.entries.push(detail)
      }
    })

    // 返回構建的 SpotsReport 物件
    return {
      reportName: this.reportName, // 設定報表名稱
      title: '',
      subtitle: '',
      data: details, // 解析出的 tour details 數據集
    }
  }
}
