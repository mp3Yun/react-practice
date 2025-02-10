import * as XLSX from 'xlsx'

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
