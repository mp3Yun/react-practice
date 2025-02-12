import ReportParserContext, {
  AuditReport,
  ReportParserStrategy,
} from './report-parser-context'
import { ReportInfo } from './report.type'

type ParserSelector = Record<
  AuditReport,
  // new (reportFileName: string) => ReportParserStrategy<ReportInfo>
  any
>
// Mapping of report names to their respective parser classes
const parserMapping: ParserSelector = {
  DailyTradingReport: 'DailyTradingParser',
  DailyTradingReportM: 'DailyTradingParser',
}

export default class ReportParserService {
  public static parseReport<T extends ReportInfo>(
    reportName: AuditReport,
    reportFileName: string,
    rawData: string[][]
  ): T {
    const ParserClass = parserMapping[reportName]

    if (!ParserClass) {
      throw new Error('Unsupported report type')
    }

    const parserInstance = new ParserClass(reportFileName)
    const reportData = new ReportParserContext(parserInstance).executeStrategy(
      rawData
    ) as unknown as T

    console.log(`[ReportParserService] ${reportName}`)
    console.dir(reportData, { depth: null, colors: true })

    return reportData
  }
}
