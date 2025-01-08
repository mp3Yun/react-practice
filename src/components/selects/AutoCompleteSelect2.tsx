import { Box, Button, Input, List, Text } from '@chakra-ui/react'
import { useState } from 'react'
import FormInput, { FormInputProps } from '../formInput/FormInput'
import { FieldValues, Form } from 'react-hook-form'

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
          console.log('blur')
          setTimeout(() => {
            setIsFocused(false)
          }, 100)
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
        </>
      )}
    </Box>
  )
}

export default AutoCompleteSelect
