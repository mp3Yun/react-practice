import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'

import FileUpload from '../../components/buttons/FileUpload'

const XlsxHomePage: React.FC = () => {
  // 在畫面上嵌入 xlsx viewer 參考 TODO:
  // https://developer.mescius.com/blogs/how-to-add-a-react-excel-xlsx-viewer-to-your-web-application
  const [data, setData] = useState([])

  // 處理檔案選擇事件
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // 獲取選擇的文件
    // TODO: use custom hook
    if (file) {
      // const reader = new FileReader()
      // reader.onload = (e: ProgressEvent<FileReader>) => {
      //   // 讀取檔案的二進位數據
      //   const abuf = e?.target?.result
      //   const workbook = XLSX.read(abuf, { type: 'array' })
      //   // 假設讀取第一個工作表
      //   const sheetName = workbook.SheetNames[0]
      //   const worksheet = workbook.Sheets[sheetName]
      //   // 將工作表轉換為 JSON 格式，並保留空格
      //   const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null })
      //   if (!jsonData) return
      //   // setData(jsonData) // 儲存轉換後的資料
      // }
      // // 讀取檔案
      // reader.readAsArrayBuffer(file)
    }
  }

  return (
    <Box>
      <Text fontSize="2xl">My test home Page</Text>
      <Box>
        <Text fontSize="xl">upload xlsx</Text>
        <FileUpload onFileSelect={handleFileUpload}></FileUpload>
      </Box>
    </Box>
  )
}

export default XlsxHomePage
