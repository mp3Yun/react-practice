import { useCallback, useState } from 'react'
import { parseExcelFile } from '../utils/xlsx-utils'

interface UseExcelProp {
  data: any
  error: string | null
  handleFile: (file: File) => void
}
const useExcel = (): UseExcelProp => {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  /**
   *  ====== note: When to use 'useCallback' ======
   * 1.handleFile 沒有作為 props 傳遞
   * 2.沒有 useEffect 依賴 handleFile，不會造成不必要的副作用。 (handleFile 不作為依賴項)
   * 則不需要使用 useCallback
   */
  // const handleFile = useCallback(async (file: File) => {
  //   try {
  //     const result = await parseExcelFile(file)
  //     setData(result)
  //     setError(null)
  //   } catch (error) {
  //     setError('Failed to parse Excel file')
  //   }
  // }, [])
  const handleFile = async (file: File) => {
    try {
      const result = await parseExcelFile(file)
      setData(result)
      setError(null)
    } catch (error) {
      setError('Failed to parse Excel file')
    }
  }

  return { data, error, handleFile }
}

export default useExcel
