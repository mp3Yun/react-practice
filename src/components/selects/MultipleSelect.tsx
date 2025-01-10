import {
  Box,
  Button,
  HStack,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import useAutoComplete, { BaseOption } from '../../hooks/UseAutoComplete'
import { translate } from '../../utils/translator'
import FormInput, { FormInputProps } from '../formInput/FormInput'
import { Tag } from '../ui/tag'

interface Props<T extends BaseOption, TFieldValues extends FieldValues> {
  options: T[]
  formInputProps: FormInputProps<TFieldValues>
  onChange?: (value: string[]) => void
}

const MultipleSelect = <
  T extends BaseOption,
  TFieldValues extends FieldValues,
>({
  options,
  formInputProps,
  onChange,
}: Props<T, TFieldValues>) => {
  const {
    queryKeyword,
    filteredOptions,
    selectedValues,
    handleSearch,
    handleOptionSelect,
  } = useAutoComplete<T>({ options, multiple: true })

  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.error(e.key)
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault()
    }
  }

  const handleOptionSelected = (option: T) => {
    if (onChange) onChange(selectedValues) // TODO: 丟出去的值都還是舊的
    /**
     *  onChange 依賴於 queryKeyword，那麼這種寫法確保了 setQueryKeyword 在 onChange 之後執行。
     * 這樣可以保證 onChange 執行時不會依賴舊的狀態，並且可以使用 queryKeyword 的最新值來執行相關邏輯。
     */
    handleOptionSelect(option)
  }

  const inputProps = {
    ...formInputProps,
    inputProps: {
      ...formInputProps.inputProps,
      value: queryKeyword,
    },
  }

  return (
    <Box width="20rem" position="relative" mt="2" mb="2">
      <FormInput
        {...inputProps}
        value={selectedValues.join(', ')}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
      />
      <Box mt="2" display="flex" flexWrap="wrap" gap="4px">
        <HStack>
          {selectedValues.map((value) => (
            <Tag
              size="md"
              key={value}
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              closable
              onClose={() => {
                const selectedOption = options.find(
                  (option) => option.value === value
                ) as T
                handleOptionSelect(selectedOption)
              }}
            >
              {translate(value)}
            </Tag>
          ))}
        </HStack>
      </Box>
      <MenuRoot
        open={isFocused}
        closeOnSelect={false}
        onOpenChange={(e) => {
          setIsFocused(e.open)
        }}
      >
        <MenuTrigger asChild>
          <Button variant="outline" mt="2" width="100%" display="none"></Button>
        </MenuTrigger>
        <MenuContent>
          {filteredOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => handleOptionSelected(option)}
              _hover={{ bg: 'gray.100' }}
              justifyContent="space-between"
            >
              <Text>{translate(option.label)}</Text>
              {selectedValues.includes(option.value) && <Text>✔</Text>}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
    </Box>
  )
}
export default MultipleSelect
