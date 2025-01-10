import {
  Box,
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { translate } from '../../utils/translator'
import FormInput, { FormInputProps } from '../formInput/FormInput'
import useAutoComplete, { BaseOption } from '../../hooks/UseAutoComplete'

interface Props<T extends BaseOption, TFieldValues extends FieldValues> {
  options: T[]
  formInputProps: FormInputProps<TFieldValues>
  onChange?: (value: string) => void
  isShowCheck?: boolean
}

const AutoCompleteSelect = <
  T extends BaseOption,
  TFieldValues extends FieldValues,
>({
  options,
  formInputProps,
  onChange,
  isShowCheck,
}: Props<T, TFieldValues>) => {
  const {
    queryKeyword,
    filteredOptions,
    handleSearch,
    handleOptionSelect,
    clearSelection,
  } = useAutoComplete<T>({ options, multiple: false })
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      setIsFocused(false)
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      clearSelection()
    }
  }

  const handleOptionSelected = (option: T) => {
    setIsFocused(false)
    if (onChange) onChange(option.value)
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
    <Box width="20rem" height="3rem" position="relative">
      <MenuRoot>
        <MenuTrigger asChild>
          <Button padding="0" variant="outline" color="gray.600" mt="2">
            <FormInput
              {...inputProps}
              value={queryKeyword}
              onKeyDown={handleKeyDown}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocused(false)
                }, 200)
              }}
            ></FormInput>
          </Button>
        </MenuTrigger>
        <MenuContent>
          {filteredOptions.map((option) => (
            <MenuItem
              cursor="pointer"
              _hover={{ bg: 'primary.300' }}
              key={option.value}
              value={option.value}
              justifyContent={'space-between'}
              onClick={() => handleOptionSelected(option)}
            >
              <Text>{translate(option.label)}</Text>
              <Text>
                {isShowCheck && queryKeyword === translate(option.label) ? (
                  <FaCheck />
                ) : (
                  ''
                )}
              </Text>
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
    </Box>
  )
}

export default AutoCompleteSelect
