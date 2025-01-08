import { Box, Button, Input, List, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface Props<T extends { value: string; label: string }> {
  options: T[]
}

const AutoCompleteSelect = <T extends { value: string; label: string }>({
  options,
}: Props<T>) => {
  const [queryKeyword, setQueryKeyword] = useState('')
  const [showOptions, setShowOptions] = useState<T[]>(options)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryKeyword(e.target.value)
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setShowOptions(filteredOptions)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsFocused(false)
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      setQueryKeyword('')
      setShowOptions(options)
    }
  }

  return (
    <Box width="20rem" height="3rem" position="relative">
      <Input
        placeholder="Search"
        value={queryKeyword}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false)
          }, 100)
        }}
      />
      {showOptions.length > 0 && isFocused && (
        <Box
          position="absolute"
          top="100%" // 設置下拉選單出現在輸入框下方
          left={0}
          right={0}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          zIndex="1000" // 確保下拉選單在其他元素上層
          bg="white" // 設置背景顏色避免被覆蓋
        >
          <List.Root
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          >
            {showOptions.map((option) => (
              <Button
                key={option.value}
                color="gray.600"
                variant="outline"
                width="100%"
                onClick={() => {
                  setQueryKeyword(option.label)
                  setIsFocused(false)
                }}
              >
                <Box flex="1" justifyItems="left">
                  <Text>{option.label}</Text>
                </Box>
              </Button>
            ))}
          </List.Root>
        </Box>
      )}
    </Box>
  )
}

export default AutoCompleteSelect
