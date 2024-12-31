/**
 * input data:
 * [ 'address', [{ "id": 1, "value": "烏拉拉" }, { "id": 2, "value": "拉拉烏" }]]
 *
 * output data:
 * [ key, "烏拉拉", "拉拉烏" ]
 * @param input
 * @returns
 */
export function flattenArray(input: any[]): any[] {
  const result: any[] = []

  input.forEach((item) => {
    if (Array.isArray(item)) {
      // 如果是陣列，遞迴展平
      result.push(...flattenArray(item))
    } else if (typeof item === 'object' && item !== null) {
      // 如果是物件，取出指定屬性值
      if ('value' in item) {
        result.push(item.value)
      }
    } else {
      // 如果是基本類型，直接加入結果
      result.push(item)
    }
  })

  return result
}

/**
 * 根據 key 展平陣列
 * input data:
 * [ { "id": 1, "value": "烏拉拉" },
 *   { "id": 2, "value": "拉拉烏" }]
 *
 * output data:
 * [ key, "烏拉拉", "拉拉烏" ]
 * @param key
 * @param input
 * @returns
 */
export function flattenArrayByKey(key: string, input: any[]): any[] {
  const result: any[] = [key] // 開始結果陣列，包含指定的 key

  input.forEach((item) => {
    if (typeof item === 'object' && item !== null && 'value' in item) {
      result.push(item.value) // 取出物件中的 value
    }
  })

  return result
}
