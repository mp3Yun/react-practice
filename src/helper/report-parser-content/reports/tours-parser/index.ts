import ParserHelper from '../../../ParserHelper'
import { ReportParserStrategy } from '../../report-parser-context'
import { DataSet, ReportInfo } from '../../report.type'
import TourDetail from './tour-detail'

// 擴展 ReportInfo，將 toursDetails 納入報表結構
export interface ToursReport extends ReportInfo {
  // tourDetails: DataSet<TourDetail> // 包含 ToursDetails 條目的數據集
}

// ToursReport 的具體策略實現
// 實作 ReportParserStrategy 介面，專門針對 ToursReport 的解析
export default class ToursReportParser
  implements ReportParserStrategy<ToursReport>
{
  reportName: string // 報表的名稱

  // 建構子接收報表名稱並將其賦值給類別實例
  constructor(reportName: string) {
    this.reportName = reportName
  }

  // parser 處理
  parse(rawData: string[][]): ToursReport {
    const { findValueIndex, setIndices, createDataObject } = ParserHelper

    // 從原始資料中找到欄位名稱所在的索引，使用 '' 作為查找目標
    const fieldNamesIndexObj = findValueIndex(rawData, 'id')

    if (!fieldNamesIndexObj) {
      throw new Error('找不到欄位名稱')
    }

    // 使用欄位名稱後的列作為起點，計算出 tours 的資料行索引範圍
    const tourDetailIndices = setIndices(
      fieldNamesIndexObj.row + 1,
      rawData.length - 1
    )

    // 初始化 toursDetails 的 DataSet 物件
    const tourDetails: DataSet<TourDetail> = { name: '', entries: [] }

    // 提取欄位名稱列，之後會用來映射資料
    const fieldNames = rawData[fieldNamesIndexObj.row]

    // 取得 TourDetail 類別中的屬性名稱
    const keys = TourDetail.getPropKeys()

    // 將 rawData 中的每一行資料轉換為 TourDetail 物件
    rawData.forEach((row, rowIndex) => {
      // 檢查當前行索引是否在 tours detail 索引範圍內
      if (tourDetailIndices.includes(rowIndex)) {
        // 將該行的原始資料轉換為 TourDetail 物件
        const detail = createDataObject<TourDetail>(fieldNames, row, keys)
        // 將解析出的細節加入 tourDetails 的 entries 陣列
        tourDetails.entries.push(detail)
      }
    })

    // 返回構建的 ToursReport 物件
    return {
      reportName: this.reportName, // 設定報表名稱
      title: '',
      subtitle: '',
      data: tourDetails, // 解析出的 tour details 數據集
    }
  }
}
