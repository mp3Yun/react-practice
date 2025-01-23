import { Box, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormGuardProvider } from '../../hooks/FormGuardContext'
import { Outlet, useLocation, useRouter } from '@tanstack/react-router'
import NestedComponent from '../../components/NestedComponent'
import { useEffect, useState } from 'react'

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

  // console.log(watch('example')) // you can watch individual input by pass the name of the input
  // 查看錯誤訊息
  // console.log('99-errors', errors)
  const location = useLocation()

  // 動態判斷當前頁面是否為子頁面
  const isCurrentPathSubPage =
    location.pathname.startsWith('/home/form') &&
    location.pathname !== '/home/form'

  return (
    <NestedComponent title="表單處理" isOpen={true}>
      {!isCurrentPathSubPage ? (
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
          {errors.example && (
            <Box color="red.500">{errors.example.message}</Box>
          )}
          <Text mb="8px">ExampleRequired</Text>
          <Input
            {...register('exampleRequired', { required: true, maxLength: 10 })}
          ></Input>
          {errors.exampleRequired && (
            <Box color="red.500">This field is required</Box>
          )}
          <input type="submit" value={'送出'} />
        </form>
      ) : (
        <FormGuardProvider>
          <Outlet />
        </FormGuardProvider>
      )}
    </NestedComponent>
  )
}
export default FormPage
