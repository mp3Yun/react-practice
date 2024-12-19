import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { AllIcons } from '../../utils/icons-utils'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

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
}
const FormInput = <TFieldValues extends FieldValues>({
  isRequired,
  label,
  name,
  control,
  rules,
  iconInfo,
  inputProps,
}: FormInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })

  console.log('99-error', error)
  return (
    <Box my={2}>
      {/* TODO icon */}
      <Text>
        {isRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </Text>
      <Input {...inputProps} {...field}></Input>
      {/* TODO icon */}
      {error?.message && (
        <Box color="red">
          <Text>{error.message}</Text>
        </Box>
      )}
    </Box>
  )
}
export default FormInput
