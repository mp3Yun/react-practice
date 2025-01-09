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

interface Props<
  T extends { value: string; label: string },
  TFieldValues extends FieldValues,
> {
  options: T[]
  formInputProps: FormInputProps<TFieldValues>
  onChange?: (value: string) => void
  isShowCheck?: boolean
}

const AutoCompleteSelect = <
  T extends { value: string; label: string },
  TFieldValues extends FieldValues,
>({
  options,
  formInputProps,
  onChange,
  isShowCheck,
}: Props<T, TFieldValues>) => {
  const [queryKeyword, setQueryKeyword] = useState('')
  const [showOptions, setShowOptions] = useState<T[]>(options)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryKeyword(e.target.value)
    const filteredOptions = options.filter((option) => {
      const translatedLabel = translate(option.label)
      return translatedLabel
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    })
    setShowOptions(filteredOptions)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && showOptions.length > 0) {
      setIsFocused(false)
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      setQueryKeyword('')
      setShowOptions(options)
    }
  }

  const handleOptionSelect = (option: T) => {
    setIsFocused(false)
    if (onChange) onChange(option.value)
    /**
     *  onChange 依賴於 queryKeyword，那麼這種寫法確保了 setQueryKeyword 在 onChange 之後執行。
     * 這樣可以保證 onChange 執行時不會依賴舊的狀態，並且可以使用 queryKeyword 的最新值來執行相關邏輯。
     */
    setQueryKeyword(translate(option.label))
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
          {showOptions.map((option) => (
            <MenuItem
              cursor="pointer"
              _hover={{ bg: 'primary.300' }}
              key={option.value}
              value={option.value}
              justifyContent={'space-between'}
              onClick={() => handleOptionSelect(option)}
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
