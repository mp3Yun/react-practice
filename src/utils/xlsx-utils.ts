import * as XLSX from 'xlsx'
import JSZip from 'jszip'
import {
  ColumnType,
  ReportInfo,
} from '../helper/report-parser-content/report.type'
import ReportParserService from '../helper/report-parser-content'
import { ReportType } from '../helper/report-parser-content/report-parser-context'

export const parseExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        // 讀取檔案的二進位數據
        const abuf = e?.target?.result
        const workbook = XLSX.read(abuf, { type: 'array' })

        // 假設讀取第一個工作表
        const sheetName = workbook.SheetNames[0] // TODO: 要做變化
        const worksheet = workbook.Sheets[sheetName]

        // 將工作表轉換為 JSON 格式，並保留空格
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null })
        resolve(jsonData)
      } catch (error) {
        reject(error)
      }
    }
    // 讀取檔案
    reader.readAsArrayBuffer(file)
  })
}

// 解析 Excel 並取得圖片對應儲存格
export const readExcelWithImages = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  // 取得第一個 sheet 的數據
  const sheetName = workbook.SheetNames[0]
  let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: null,
  })
  console.log('📊 表格數據:', sheetData)

  // 解壓縮 Excel ZIP 檔案
  const zip = await JSZip.loadAsync(arrayBuffer)
  // 儲存圖片的 Base64 資料
  const imageFiles: Record<string, string> = {}
  // 儲存圖片對應的儲存格
  const imageMappings: Record<string, string> = {}

  // 讀取 Excel 內的所有圖片
  for (const fileName of Object.keys(zip.files)) {
    if (fileName.startsWith('xl/media/')) {
      const imgData = await zip.files[fileName].async('base64')
      imageFiles[fileName] = `data:image/png;base64,${imgData}`
    }
  }

  // 解析 'xl/drawings/drawingX.xml' 來取得圖片對應的儲存格
  for (const fileName of Object.keys(zip.files)) {
    if (fileName.startsWith('xl/drawings/drawing')) {
      const drawingXml = await zip.files[fileName].async('text')
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(drawingXml, 'text/xml')

      // 取得圖片 ID 和對應的儲存格
      const drawings = xmlDoc.getElementsByTagName('xdr:twoCellAnchor')
      for (const drawing of drawings) {
        const fromCell = drawing.getElementsByTagName('xdr:from')[0]
        const col = fromCell.getElementsByTagName('xdr:col')[0].textContent
        const row = fromCell.getElementsByTagName('xdr:row')[0].textContent
        const imageId = drawing
          .getElementsByTagName('a:blip')[0]
          ?.getAttribute('r:embed')

        if (col && row && imageId) {
          // Excel -的行列是 0-based，需要轉換成 A1 格式
          const collLetter = String.fromCharCode(65 + parseInt(col, 10)) // 轉換數字到 A, B, C...
          const cellAddress = `${collLetter}${parseInt(row, 10) + 1}`

          // 'xl/drawings/_rels/drawingX.xml.rels' 內部存放圖片與 'xl/media/' 的關聯
          const relsFile = `xl/drawings/_rels/${fileName.split('/').pop()}.rels`
          if (zip.files[relsFile]) {
            const relsXml = await zip.files[relsFile].async('text')
            const relsDoc = parser.parseFromString(relsXml, 'text/xml')
            const relationships = relsDoc.getElementsByTagName('Relationship')

            for (const rel of relationships) {
              if (rel.getAttribute('Id') === imageId) {
                const target = rel.getAttribute('Target') // ex: '../media/image1.png'
                if (target) {
                  const imgPath = target.replace('../media', 'xl/media')
                  imageMappings[cellAddress] = imageFiles[imgPath]
                }
              }
            }
          }
        }
      }
    }
  }

  sheetData = matchImagesToData(sheetData as ExcelData[], imageMappings)
  console.log('🖼️ 圖片對應儲存格:', imageMappings)
  return { sheetName, sheetData, imageMappings }
}

type ExcelData = { [key: string]: any }
type ImageData = { [cell: string]: string }
export function matchImagesToData(data: ExcelData[], images: ImageData) {
  // 複製原始資料
  const result = [...data]

  Object.entries(images).forEach(([cell, base64]) => {
    // 解析 Excel 儲存格，如 "J22" -> "J", 22
    const match = cell.match(/^([A-Z]+)(\d+)$/)
    if (!match) return

    const [, column, rowStr] = match
    const rowIndex = parseInt(rowStr, 10) - 2 // 減去標題行的影響，以10進制轉化
    const columnIndex = column.charCodeAt(0) - 65 // A -> 0, B -> 1

    const keys = Object.keys(data[0])
    if (rowIndex >= 0 && rowIndex < result.length) {
      const fieldKey = keys[columnIndex]
      result[rowIndex][fieldKey] = base64
    }
  })

  return result
}

/**
 * 取得 excel sheetName
 */
export async function getExcelSheetName(
  file: File,
  assignIndex = 0
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  // 取得第X個 sheet 的名稱
  const sheetName = workbook.SheetNames[assignIndex]
  return sheetName
}
/**
 * 取得 excel 報表原始資料
 * @param file
 * @returns
 */
export function getExcelRawData(
  file: File,
  mode: 'row' | 'column' = 'row'
): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    /**
     * [FileReader]
     * 優點：
     * 舊版瀏覽器兼容性較好（但現在大多數瀏覽器都支援 arrayBuffer()）。
     * 使用 onload 事件處理讀取完成的邏輯，適合基於事件的操作。
     * 缺點：
     * 只能在瀏覽器環境使用，無法在 Node.js 等其他環境執行。
     * 需要手動綁定 onload、onerror 等事件，程式碼結構較為分散。
     * 不能使用 await，可讀性較差。
     */
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        // 讀取檔案的二進位數據
        const abuf = e?.target?.result
        const workbook = XLSX.read(abuf, { type: 'array' })

        // 假設讀取第一個工作表
        const sheetName = workbook.SheetNames[0] // TODO: 要做變化
        const worksheet = workbook.Sheets[sheetName]
        // 將工作表轉換為 string[][] 格式
        // 遍歷每一行數據
        let sheetCsvData = XLSX.utils.sheet_to_csv(worksheet, {
          FS: '[splitColumn]',
          RS: '[SplitRow]',
        })

        const records: string[][] = []
        let rowRawData = sheetCsvData.split('[SplitRow]')

        rowRawData.forEach((item) => {
          const rowData = item.split('[splitColumn]')
          records.push(rowData)
        })

        const result: string[][] = []
        if (mode === 'row') {
          result.push(...records)
        } else {
          // 轉置二維數組
          for (let i = 0; i < records[0].length; i += 1) {
            const columnData = []
            for (let j = 0; j < records.length; j += 1) {
              columnData.push(records[j][i])
            }
            result.push(columnData)
          }
        }
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }
    // 讀取檔案
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 取得 excel 報表中的圖檔
 */
export async function getExcelImagesMaps(
  file: File
): Promise<Record<string, string>> {
  const arrayBuffer = await file.arrayBuffer()
  // 解壓縮 Excel ZIP 檔案
  const zip = await JSZip.loadAsync(arrayBuffer)
  // 儲存圖片的 Base64 資料
  const imageFiles: Record<string, string> = {}
  // 儲存圖片對應的儲存格
  const imageMappings: Record<string, string> = {}

  // 讀取 Excel 內的所有圖片
  for (const fileName of Object.keys(zip.files)) {
    if (fileName.startsWith('xl/media/')) {
      const imgData = await zip.files[fileName].async('base64')
      imageFiles[fileName] = `data:image/png;base64,${imgData}`
    }
  }

  // 解析 'xl/drawings/drawingX.xml' 來取得圖片對應的儲存格
  for (const fileName of Object.keys(zip.files)) {
    if (fileName.startsWith('xl/drawings/drawing')) {
      const drawingXml = await zip.files[fileName].async('text')
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(drawingXml, 'text/xml')

      // 取得圖片 ID 和對應的儲存格
      const drawings = xmlDoc.getElementsByTagName('xdr:twoCellAnchor')
      for (const drawing of drawings) {
        const fromCell = drawing.getElementsByTagName('xdr:from')[0]
        const col = fromCell.getElementsByTagName('xdr:col')[0].textContent
        const row = fromCell.getElementsByTagName('xdr:row')[0].textContent
        const imageId = drawing
          .getElementsByTagName('a:blip')[0]
          ?.getAttribute('r:embed')

        if (col && row && imageId) {
          // Excel -的行列是 0-based，需要轉換成 A1 格式
          const collLetter = String.fromCharCode(65 + parseInt(col, 10)) // 轉換數字到 A, B, C...
          const cellAddress = `${collLetter}${parseInt(row, 10) + 1}`

          // 'xl/drawings/_rels/drawingX.xml.rels' 內部存放圖片與 'xl/media/' 的關聯
          const relsFile = `xl/drawings/_rels/${fileName.split('/').pop()}.rels`
          if (zip.files[relsFile]) {
            const relsXml = await zip.files[relsFile].async('text')
            const relsDoc = parser.parseFromString(relsXml, 'text/xml')
            const relationships = relsDoc.getElementsByTagName('Relationship')

            for (const rel of relationships) {
              // 注意 Id 的大小寫，若取不到圖片，有可能是這邊的問題
              if (rel.getAttribute('Id') === imageId) {
                const target = rel.getAttribute('Target') // ex: '../media/image1.png'
                if (target) {
                  const imgPath = target.replace('../media', 'xl/media')
                  imageMappings[cellAddress] = imageFiles[imgPath]
                }
              }
            }
          }
        }
      }
    }
  }
  console.log('🖼️ 圖片對應儲存格:', imageMappings)
  return imageMappings
}

/**
 * 轉換 excel資料 -> 特定物件
 * @param reportType
 * @param reportFileName
 * @param rawData
 */
export function parseExcelDataToReportModel<T extends ReportInfo>(
  reportType: ReportType,
  reportFileName: string,
  rawData: string[][]
): T {
  return ReportParserService.parseReport<T>(reportType, reportFileName, rawData)
}

/**
 * image 關聯特定物件之相對位置圖檔
 * @param {string[][]} rawData
 * @param {Record<string, string>} imagesMappings
 */
export function associateImageWithRawData(
  rawData: string[][],
  imagesMappings: Record<string, string> | null
) {
  if (!imagesMappings) return rawData
  // 複製原始資料
  const result = [...rawData]

  Object.entries(imagesMappings).forEach(([cell, base64]) => {
    // 解析 Excel 儲存格，如 "J22" -> "J", 22
    const match = cell.match(/^([A-Z]+)(\d+)$/)
    if (!match) return

    const [, column, rowStr] = match
    const rowIndex = parseInt(rowStr, 10) - 1 // 從 0 開始，以10進制轉化
    const columnIndex = column.charCodeAt(0) - 65 // A -> 0, B -> 1

    if (rowIndex >= 0 && rowIndex < result.length) {
      result[rowIndex][columnIndex] = base64
    }
  })
  console.log('[Result] associate Image With RawData:', result)
  return result
}
