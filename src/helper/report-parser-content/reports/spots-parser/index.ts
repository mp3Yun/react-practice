import ParserHelper from '../../../ParserHelper'
import { ReportParserStrategy } from '../../report-parser-context'
import { DataSet, ReportInfo } from '../../report.type'
import SpotDetail from './spot-detail'

// 擴展 ReportInfo，將 spotsDetails 納入報表結構
export interface SpotsReport extends ReportInfo {}

// SpotsReport 的具體策略實現
// 實作 ReportParserStrategy 介面，專門針對 SpotsReport 的解析
export default class SpotsReportParser
  implements ReportParserStrategy<SpotsReport>
{
  reportName: string // 報表的名稱

  // 建構子接收報表名稱並將其賦值給類別實例
  constructor(reportName: string) {
    this.reportName = reportName
  }

  // parser 處理
  parse(rawData: string[][]): SpotsReport {
    const { findValueIndex, setIndices, createDataObject } = ParserHelper

    // 從原始資料中找到欄位名稱所在的索引，使用 '' 作為查找目標
    const fieldNamesIndexObj = findValueIndex(rawData, 'id')

    if (!fieldNamesIndexObj) {
      throw new Error('找不到欄位名稱')
    }

    // 使用欄位名稱後的列作為起點，計算出 spots 的資料行索引範圍
    const spotDetailIndices = setIndices(
      fieldNamesIndexObj.row + 1,
      rawData.length - 1
    )

    // 初始化 spotsDetails 的 DataSet 物件
    const spotsDetails: DataSet<SpotDetail> = { name: '', entries: [] }

    // 提取欄位名稱列，之後會用來映射資料
    const fieldNames = rawData[fieldNamesIndexObj.row]

    // 取得 TourDetail 類別中的屬性名稱
    const keys = SpotDetail.getPropKeys()

    // 將 rawData 中的每一行資料轉換為 TourDetail 物件
    rawData.forEach((row, rowIndex) => {
      // 檢查當前行索引是否在 spots detail 索引範圍內
      if (spotDetailIndices.includes(rowIndex)) {
        // 將該行的原始資料轉換為 TourDetail 物件
        const detail = createDataObject<SpotDetail>(fieldNames, row, keys)
        // 將解析出的細節加入 tourDetails 的 entries 陣列
        spotsDetails.entries.push(detail)
      }
    })

    // 返回構建的 SpotsReport 物件
    return {
      reportName: this.reportName, // 設定報表名稱
      title: '',
      subtitle: '',
      data: spotsDetails, // 解析出的 tour details 數據集
    }
  }
}
