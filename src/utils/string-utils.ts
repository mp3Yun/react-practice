export function hasAdjacentDuplicates(str: string) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true // 如果發現相鄰相同的字符，則返回 true
    }
  }
  return false // 如果沒有發現，則返回 false
}
