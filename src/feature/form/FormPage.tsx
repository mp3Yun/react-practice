import { Box, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const FormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: '',
      exampleRequired: '',
    },
  })

  console.log(watch('example')) // you can watch individual input by pass the name of the input
  // 查看錯誤訊息
  console.log('99-errors', errors)

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data))
      })}
    >
      <Text mb="8px">Example</Text>
      <Input
        {...register('example', {
          required: true,
          max: {
            value: 99,
            message: 'Value must be less than 99',
          },
          min: {
            value: 18,
            message: 'Value must be greater than 18',
          },
        })}
        defaultValue="test"
      ></Input>
      {errors.example && <Box color="red.500">{errors.example.message}</Box>}
      <Text mb="8px">ExampleRequired</Text>
      <Input
        {...register('exampleRequired', { required: true, maxLength: 10 })}
      ></Input>
      {errors.exampleRequired && (
        <Box color="red.500">This field is required</Box>
      )}
      <input type="submit" />
    </form>
  )
}
export default FormPage
