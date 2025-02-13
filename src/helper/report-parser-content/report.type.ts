// 共用部分
export interface ReportInfo {
  reportName: string
  title?: string
  subtitle?: string
  data: DataSet<any>
}

export type ColumnType = { name: string; value: string }
export type DataSet<T> = { name: string; entries: T[] }
export type SummaryInfo<T> = { name: string; summaryInfo: T }
