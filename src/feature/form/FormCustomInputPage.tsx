import { Form, useForm } from 'react-hook-form'
import NestedComponent from '../../components/NestedComponent'
import FormInput from '../../components/formInput/FormInput'
import { Button } from '@chakra-ui/react'

interface FormValues {
  userAccount: string
  pwd: string
}
const FormCustomInputPage: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <NestedComponent title="Form Custom Input">
      <form name="basic" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormInput<FormValues>
          control={control}
          name="userAccount"
          isRequired={true}
          label="帳號"
          rules={{ required: '請輸入帳號' }}
        ></FormInput>
        <FormInput<FormValues>
          control={control}
          name="pwd"
          isRequired={true}
          label="密碼"
          rules={{ required: '請輸入密碼' }}
        ></FormInput>
        <Button type="submit">登入</Button>
      </form>
    </NestedComponent>
  )
}

export default FormCustomInputPage
