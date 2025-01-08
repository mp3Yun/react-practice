import { Box, Button, List, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import FormInput, { FormInputProps } from '../formInput/FormInput'

interface Props<
  T extends { value: string; label: string },
  TFieldValues extends FieldValues,
> {
  options: T[]
  formInputProps: FormInputProps<TFieldValues>
}

const AutoCompleteSelect = <
  T extends { value: string; label: string },
  TFieldValues extends FieldValues,
>({
  options,
  formInputProps,
}: Props<T, TFieldValues>) => {
  const [queryKeyword, setQueryKeyword] = useState('')
  const [showOptions, setShowOptions] = useState<T[]>(options)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('99-handleSearch:', e.target.value)
    setQueryKeyword(e.target.value)
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setShowOptions(filteredOptions)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('99-handleKeyDown:', e.key)
    if (e.key === 'Enter' && showOptions.length > 0) {
      setIsFocused(false)
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      setQueryKeyword('')
      setShowOptions(options)
    }
  }

  const handleOptionSelect = (option: T) => {
    console.log('99-handleOptionSelect:', option)
    setQueryKeyword(option.label)
    setIsFocused(false)
  }

  const inputProps = {
    ...formInputProps,
    inputProps: {
      ...formInputProps.inputProps,
      value: queryKeyword,
    },
  }

  return (
    <Box width="20rem" height="5rem">
      <FormInput
        {...inputProps}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          console.log('onBlur')
          setTimeout(() => {
            setIsFocused(false)
          }, 200)
        }}
      ></FormInput>
      {showOptions.length > 0 && isFocused && (
        <>
          <List.Root
            mt={2}
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
                onClick={() => handleOptionSelect(option)}
              >
                <Box flex="1" justifyItems="left">
                  <Text>{option.label}</Text>
                </Box>
              </Button>
            ))}
          </List.Root>
        </>
      )}
    </Box>
  )
}

export default AutoCompleteSelect
