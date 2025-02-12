// 共用部分
export interface ReportInfo {
  reportName: string;
  title?: string;
  subtitle?: string;
  tradingDate?: string;
  printDate?: string;
  printer?: string;
  // 交易專戶
  tradingAccount?: string;
  // 幣別
  currency?: string;
  // 審核狀態
  bpStatus?: string;
  // 審核人
  finalEmployeeName?: string;
  // 查詢日期
  searchDate?: string;
  // 國證帳號
  SecuritiesAccount?: string;
}

export type ColumnType = { name: string, value: string };
export type DataSet<T> = { name: string, entries: T[]; };
export type SummaryInfo<T> = { name: string, summaryInfo: T };
