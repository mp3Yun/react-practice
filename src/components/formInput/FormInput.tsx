import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { AllIcons } from '../../utils/icons-utils'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

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
  inputProps,
}: FormInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })

  // console.log('FormInput-error', error)
  return (
    <Box my={2}>
      <Text>
        {isRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </Text>
      <Input {...inputProps} {...field}></Input>
      {error?.message && (
        <Box color="red">
          <Text>{error.message}</Text>
        </Box>
      )}
    </Box>
  )
}
export default FormInput
