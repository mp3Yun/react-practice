import {
  Box,
  Button,
  HStack,
  Input,
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
import { FormInputProps } from '../formInput/FormInput'
import { Field } from '../ui/field'
import { Tag } from '../ui/tag'

interface Props<T extends BaseOption, TFieldValues extends FieldValues> {
  options: T[]
  formInputProps: FormInputProps<TFieldValues>
  onChange?: (value: string[]) => void
}

const MultipleSelect2 = <
  T extends BaseOption,
  TFieldValues extends FieldValues,
>({
  options,
  formInputProps,
  onChange,
}: Props<T, TFieldValues>) => {
  const { filteredOptions, selectedValues, handleOptionSelect } =
    useAutoComplete<T>({ options, multiple: true })

  const [isFocused, setIsFocused] = useState(false)

  const handleOptionSelected = (option: T) => {
    const updatedSelectedValues = [...selectedValues]
    if (updatedSelectedValues.includes(option.value)) {
      // 移除選項
      const index = updatedSelectedValues.indexOf(option.value)
      updatedSelectedValues.splice(index, 1)
    } else {
      // 新增選項
      updatedSelectedValues.push(option.value)
    }

    handleOptionSelect(option) // 更新狀態
    if (onChange) onChange(updatedSelectedValues) // 確保丟出最新值
  }

  const inputprops = {
    ...formInputProps.inputProps,
  }

  return (
    <Box width="20rem" position="relative" mt="2" mb="2">
      <Field
        border="solid 1px #ccc"
        padding="2"
        as="div"
        bgColor="white"
        onClick={() => setIsFocused(true)}
      >
        {selectedValues.length !== 0 && (
          <Box display="flex" flexWrap="wrap" gap="4px">
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
                    handleOptionSelected(selectedOption)
                  }}
                >
                  {translate(value)}
                </Tag>
              ))}
            </HStack>
          </Box>
        )}
        {selectedValues.length === 0 && (
          <Input {...inputprops} variant="flushed"></Input>
        )}
      </Field>

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
export default MultipleSelect2
