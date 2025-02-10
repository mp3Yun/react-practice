import React from 'react'

interface Prop {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
}
const FileUpload: React.FC<Prop> = ({
  onFileSelect,
  accept = '.xlsx,.xls', // 預設為 xlsx
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e)
  }
  return (
    <input type="file" accept={accept} onChange={(e) => handleFileChange(e)} />
  )
}

export default FileUpload
