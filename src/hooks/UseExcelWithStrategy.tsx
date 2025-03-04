import { useEffect, useState } from 'react'
import { ReportType } from '../helper/report-parser-content/report-parser-context'
import { ReportInfo } from '../helper/report-parser-content/report.type'
import {
  associateImageWithRawData,
  getExcelImagesMaps,
  getExcelRawData,
  getExcelSheetName,
  parseExcelDataToReportModel,
} from '../utils/xlsx-utils'

interface UseExcelWithStrategyProp<T extends ReportInfo> {
  sheetName: string
  rawData: string[][]
  parsedReport: T | null
  parsedData: any[]
  error: string | null
  imageMappings: Record<string, string> | null
  handleFile: (file: File) => void
}

const useExcelWithStrategy = <T extends ReportInfo>(
  reportType: ReportType
): UseExcelWithStrategyProp<T> => {
  const [sheetName, setSheetName] = useState<string>('')
  const [rawData, setRawData] = useState<string[][]>([])
  const [parsedReport, setParsedReport] = useState<T | null>(null)
  const [parsedData, setParsedData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [imageMappings, setImageMappings] = useState<Record<
    string,
    string
  > | null>(null)
  const handleFile = async (file: File) => {
    try {
      const [excelSheetName, excelRawData, excelImageMaps] = await Promise.all([
        getExcelSheetName(file),
        getExcelRawData(file, 'row'),
        getExcelImagesMaps(file),
      ])
      setSheetName(excelSheetName)
      setRawData(excelRawData)
      setImageMappings(excelImageMaps)
      setError(null)
    } catch (error) {
      setError('Failed to parse Excel file')
    }
  }

  useEffect(() => {
    if (rawData.length > 0) {
      // 處理 rawData 時，把 image 塞進去 找到相對應的位置
      const sortRawDataAndImages = associateImageWithRawData(
        rawData,
        imageMappings
      )
      // 處理 excel rawData 與 imagesMapping
      const reportModel = parseExcelDataToReportModel<T>(
        reportType,
        sheetName,
        sortRawDataAndImages
      )
      // console.log('reportModel =>', reportModel)
      setParsedReport(reportModel)
      if (reportModel?.data && reportModel?.data.entries.length > 0) {
        setParsedData(reportModel.data.entries)
      }
    }
  }, [rawData, imageMappings])

  return {
    sheetName,
    rawData,
    parsedReport,
    parsedData,
    error,
    imageMappings,
    handleFile,
  }
}

export default useExcelWithStrategy
