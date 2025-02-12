export type ColumnType = { name: string; value: string }

type FindValueIndex = {
  row: number
  column: number
}

export type FormulaObj = {
  formula: string
  result?: string | number
}

// export function setFunc<T>(fieldName: string[], row: string[], keys: string[]):T {
//   validateFieldRowLength(fieldName, row);
//   const obj = createObjectFromArrays(keys, fieldName, row);
//   return obj as T;
// }

export default class ParserHelper {
  private static validateFieldRowLength(
    fieldName: string[],
    row: string[]
  ): void {
    if (fieldName.length !== row.length) {
      throw new Error('請確認欄位與資料欄位數量是否一致')
    }
  }

  private static createObjectFromArrays<C extends string>(
    keys: C[],
    fieldName: string[],
    row: string[]
  ): Partial<Record<C, ColumnType>> {
    const obj: Partial<Record<C, ColumnType>> = {}

    keys.forEach((key, index) => {
      obj[key] = { name: fieldName[index], value: row[index] }
    })

    return obj
  }

  static createDataObject<T>(
    fieldName: string[],
    row: string[],
    keys: string[]
  ): T {
    ParserHelper.validateFieldRowLength(fieldName, row)
    const obj = ParserHelper.createObjectFromArrays(keys, fieldName, row)
    return obj as T
  }

  /**
   * find value index
   * value 建議為唯一值
   * @param rawData
   * @param value 要找的值
   * @param useRegex 使用正則表示式搜尋匹配值
   * @returns
   */
  static findValueIndex(
    rawData: string[][],
    value: string,
    useRegex: boolean = false
  ): FindValueIndex | null {
    const regex = useRegex ? new RegExp(value) : null
    for (let i = 0; i < rawData.length; i += 1) {
      for (let j = 0; j < rawData[i].length; j += 1) {
        if (useRegex) {
          if (regex && regex.test(rawData[i][j])) {
            return { row: i, column: j }
          }
        } else if (rawData[i][j] === value) {
          return { row: i, column: j }
        }
      }
    }
    return null // 如果未找到，返回 null
  }

  /**
   * find value indices
   * 若 value 為重複值，建議使用該方法
   * @param rawData
   * @param value 要找的值
   * @returns
   */
  static findValueIndices(
    rawData: string[][],
    value: string
  ): Record<string, { row: number; column: number }[]> {
    const indices: Record<string, { row: number; column: number }[]> = {}

    for (let row = 0; row < rawData.length; row += 1) {
      for (let column = 0; column < rawData[row].length; column += 1) {
        const currentValue = rawData[row][column]
        if (currentValue === value) {
          if (!indices[value]) {
            // init
            indices[value] = []
          }
          indices[value].push({ row, column })
        }
      }
    }

    return indices
  }

  /**
   * Set the index range for the same section
   * @param startIndex
   * @param endIndex
   * @returns number[]
   */
  static setIndices(startIndex: number, endIndex: number): number[] {
    return Array.from(
      { length: endIndex - startIndex + 1 },
      (_, index) => startIndex + index
    )
  }

  static getFormulaObjValue(obj: FormulaObj) {
    return (obj?.result ?? 0) as string
  }
}
