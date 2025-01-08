import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { AllIcons } from '../../utils/icons-utils'
import ErrorMessage from './ErrorMessage'

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
  // onChange,
  onFocus,
  onKeyDown,
  onBlur,
}: FormInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })
  return (
    <Box my={2}>
      <Text>
        {isRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </Text>
      <Input
        {...inputProps}
        {...field}
        // onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      ></Input>
      <ErrorMessage message={error?.message} />
    </Box>
  )
}
export default FormInput
