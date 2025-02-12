// Define a generic type that refers to all report interfaces
export type AuditReport = 'DailyTradingReport' | 'DailyTradingReportM'

// Strategy Interface
export interface ReportParserStrategy<T> {
  reportName: string
  parse(rawData: string[][]): T
}

// Context Class that uses the strategy
export default class ReportParserContext<T> {
  private strategy: ReportParserStrategy<T>

  constructor(strategy: ReportParserStrategy<T>) {
    this.strategy = strategy
  }

  public executeStrategy(rawData: string[][]): T {
    return this.strategy.parse(rawData)
  }
}
