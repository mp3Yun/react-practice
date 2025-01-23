import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { AllIcons } from '../../utils/icons-utils'
import ErrorMessage from './ErrorMessage'
import { useFormLayoutContext } from '../../hooks/FormLayoutContext'
import { useEffect } from 'react'

interface IconInfoProps {
  icon: AllIcons
  color: string
  size?: number
  isRight?: boolean
  isLeft?: boolean
}
export interface FormInputProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  isRequired?: boolean
  label?: string
  iconInfo?: IconInfoProps
  inputProps?: InputProps
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}
const FormInput = <TFieldValues extends FieldValues>({
  isRequired,
  label,
  name,
  control,
  rules,
  inputProps,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onBlur,
}: FormInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })

  const { flexDir } = useFormLayoutContext()
  const direction = flexDir ?? 'column'

  // 如果有自定義的 onChange，則結合 react-hook-form 的 field.onChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e) // 執行自定義的 onChange 邏輯
    }
    field.onChange(e) // 保證 react-hook-form 的狀態更新
  }
  return (
    <Box
      my={2}
      display="flex"
      flexDir={direction}
      alignItems={direction === 'row' ? 'center' : 'start'}
    >
      <Text
        height="auto"
        whiteSpace="nowrap"
        mr={direction === 'row' ? '10px' : '0px'}
        pb={direction === 'row' ? '20px' : '0px'}
        lineHeight="1" // 確保行高不影響對齊
      >
        {isRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </Text>
      <Box flex="1">
        <Input
          {...inputProps}
          {...field}
          value={value ?? field.value}
          onChange={handleOnChange} // 使用自定義的 onChange 處理
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        ></Input>
        <ErrorMessage message={error?.message} />
      </Box>
    </Box>
  )
}
export default FormInput
