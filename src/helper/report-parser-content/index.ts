import ReportParserContext, {
  ReportType,
  ReportParserStrategy,
} from './report-parser-context'
import { ReportInfo } from './report.type'
import ToursReportParser from './reports/spots-parser'

type ParserSelector = Record<
  ReportType,
  new (reportFileName: string) => ReportParserStrategy<ReportInfo>
>
// Mapping of report names to their respective parser classes
const parserMapping: ParserSelector = {
  SpotsReport: ToursReportParser,
  // HotelsReport:
}

export default class ReportParserService {
  public static parseReport<T extends ReportInfo>(
    reportName: ReportType,
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
