import { useState } from 'react'
import { translate } from '../utils/translator'

export interface BaseOption {
  value: string
  label: string
}

interface UseAutoCompleteProps<T extends BaseOption> {
  options: T[] // 全部選項
  multiple?: boolean // 是否支持多選
}

const useAutoComplete = <T extends BaseOption>({
  options,
  multiple = false,
}: UseAutoCompleteProps<T>) => {
  // 查詢條件
  const [queryKeyword, setQueryKeyword] = useState('')
  // 根據查詢條件篩選畫面顯示項目
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options)
  // 選取的項目
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple ? [] : ['']
  )

  // 篩選處理
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryKeyword(e.target.value)
    const filteredOptions = options.filter((option) => {
      const translatedLabel = translate(option.label)
      return translatedLabel
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    })
    setFilteredOptions(filteredOptions)
  }

  // 選取處理
  const handleOptionSelect = (option: T) => {
    if (multiple) {
      setSelectedValues((prevValues) => {
        return prevValues.includes(option.value)
          ? prevValues.filter((value) => value !== option.value) // 取消選擇
          : [...prevValues, option.value] // 添加選擇
      })
    } else {
      setSelectedValues([option.value])
    }
    setQueryKeyword(translate(option.label)) // 同步輸入框內容
  }

  // 清空選擇
  const clearSelection = () => {
    setSelectedValues([])
    setQueryKeyword('')
    setFilteredOptions(options)
  }

  return {
    queryKeyword,
    filteredOptions,
    selectedValues,
    handleSearch,
    handleOptionSelect,
    clearSelection,
  }
}

export default useAutoComplete
