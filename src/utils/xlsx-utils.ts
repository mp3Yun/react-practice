import * as XLSX from 'xlsx'
import JSZip from 'jszip'

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
const readExcelWithImages = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  // 取得第一個 sheet 的數據
  const sheetName = workbook.SheetNames[0]
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
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
          // Excel 的行列是 0-based，需要轉換成 A1 格式
          const collLetter = String.fromCharCode(65 + parseInt(col, 10)) // 轉換數字到 A, B, C...
          const cellAddress = `${collLetter}${parseInt(row, 10) + 1}`

          // 'xl/drawings/_rels/drawingX.xml.rels' 內部存放圖片與 'xl/media/' 的關聯
          const relsFile = `xl/drawings/_rels/${fileName.split('/').pop()}.rels`
          if (zip.files[relsFile]) {
            const relsXml = await zip.files[relsFile].async('text')
            const relsDoc = parser.parseFromString(relsXml, 'text/xml')
            const relationships = relsDoc.getElementsByTagName('Relationship')

            for (const rel of relationships) {
              if (rel.getAttribute('id') === imageId) {
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

    console.log('🖼️ 圖片對應儲存格:', imageMappings)
    return { sheetData, imageMappings }
  }
}

// /**
//    * 取得 excel 報表原始資料
//    * @param sheet
//    * @returns
//    */
// excelRawData(sheet: ExcelJS.Worksheet, mode: 'row' | 'column' = 'row'): string[][] {
// 	const records: string[][] = [];

// 	// 遍歷每一行數據
// 	sheet.eachRow({ includeEmpty: false }, (row) => {
// 		const rowData = [];
// 		const mergedCells = new Set<Record<string, string>>(); // 用於記錄已處理的合併儲存格範圍
// 		row.eachCell({ includeEmpty: true }, (cell) => {
// 			const cellValue = cell.value as string;
// 			if (cell.isMerged) {
// 				const rangeKey = `${cell.row}-${cell.col}`; // 生成唯一的範圍鍵
// 				if (![...mergedCells].some((item) => item.rangeKey === rangeKey || item.value === cellValue)) {
// 					rowData.push(cell.value); // 只記錄第一個合併儲存格的內容
// 					mergedCells.add({ rangeKey, value: cellValue }); // 標記為已處理
// 				}
// 			} else {
// 				rowData.push(cellValue);
// 			}
// 		});
// 		records.push(rowData);
// 	});
// 	const result: string[][] = [];

// 	if (mode === 'row') {
// 		result.push(...records);
// 	} else {
// 		// 轉置二維數組
// 		for (let i = 0; i < records[0].length; i += 1) {
// 			const columnData = [];
// 			for (let j = 0; j < records.length; j += 1) {
// 				columnData.push(records[j][i]);
// 			}
// 			result.push(columnData);
// 		}
// 	}
// 	console.debug('[ReportExcelService] excelRawData =>', result);
// 	return result;
// }

// /**
//  * 取得 excel 所有 sheets 原始資料
//  * @param filePath
//  */
// async extractSheetsData(filePath: string) {
// 	const workbook = new ExcelJS.Workbook();
// 	await workbook.xlsx.readFile(filePath);

// 	const allSheetsContent: Record<string, unknown[]> = {};

// 	workbook.eachSheet((sheet) => {
// 		const sheetData: unknown[] = [];
// 		sheet.eachRow((row) => {
// 			const rowData: unknown[] = [];
// 			row.eachCell({ includeEmpty: true }, (cell) => {
// 				rowData.push(cell?.value !== undefined ? cell.value : null);
// 			});
// 			sheetData.push(rowData);
// 		});
// 		allSheetsContent[sheet.name] = sheetData; // 將每個工作表的內容儲存在對應的鍵中
// 	});

// 	return this.convertTo2DArrayWithKeys(allSheetsContent);
// }
