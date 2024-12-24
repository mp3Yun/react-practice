import { Box, Button } from '@chakra-ui/react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import NestedComponent from '../../components/NestedComponent'
import FormInput from '../../components/formInput/FormInput'

interface FormValues {
  userAccount: string
  pwd: string
  roleInfo: {
    role: string
  }
}
const FormCustomInputPage: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <>
      <NestedComponent title="Form Custom Input" className="show-border">
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
          <FormInput<FormValues>
            control={control}
            name="roleInfo.role"
            isRequired={true}
            label="角色"
            rules={{ required: '請輸入角色' }}
          ></FormInput>
          <Button type="submit">登入</Button>
        </form>
      </NestedComponent>
      <br />
      <NestedComponent title="[UseForm] Form > Form" className="show-border">
        <FormOfForm></FormOfForm>
      </NestedComponent>
      <br></br>
      <NestedComponent
        title="[UseFormContext] Form > Form"
        className="show-border"
      >
        <FormOfFormUseFormContext></FormOfFormUseFormContext>
      </NestedComponent>
    </>
  )
}
export default FormCustomInputPage

// ============ 表單中的表單 sample 2 useForm hook =========== //
interface FormSample2 {
  name: string
  age: string
  telephone: string
  emails: {
    email1: string
  }
}
const FormOfForm: React.FC = () => {
  const userFormMethods = useForm<FormSample2>({
    defaultValues: {
      name: '',
      age: '',
      telephone: '',
      emails: {
        email1: '',
      },
    },
  })

  type EmailsType = FormSample2['emails']
  const emailsFormMethods = useForm<EmailsType>({
    defaultValues: {
      email1: '',
    },
  })

  const handleUserFormSubmit = (data: FormSample2) => {
    console.log('user form data', data)
  }

  const handleEmailsSubmit = (data: EmailsType) => {
    console.log('emails form data', data)
    // 更新父表單的值
    userFormMethods.setValue('emails', data)
  }
  return (
    <FormProvider {...userFormMethods}>
      <form onSubmit={userFormMethods.handleSubmit(handleUserFormSubmit)}>
        <FormInput<FormSample2>
          name="name"
          isRequired={true}
          label="姓名"
          rules={{ required: '請輸入姓名' }}
        ></FormInput>
        <FormInput<FormSample2>
          name="age"
          isRequired={true}
          label="年齡"
          rules={{ required: '請輸入年齡' }}
        ></FormInput>
        <FormInput<FormSample2>
          name="telephone"
          isRequired={true}
          label="電話"
          rules={{ required: '請輸入電話' }}
        ></FormInput>
        <Button type="submit">確認</Button>
      </form>
      {/* 子表單：使用獨立的容器 */}
      <Box mt={4} borderWidth="1px" p={4} borderRadius="md">
        <form onSubmit={emailsFormMethods.handleSubmit(handleEmailsSubmit)}>
          <FormInput<EmailsType>
            control={emailsFormMethods.control}
            name="email1"
            label="電子郵件一"
          />
          <Button type="submit" mt={4}>
            提交電子郵件
          </Button>
        </form>
      </Box>
    </FormProvider>
  )
}

// =========== 表單中的表單 sample3 useFormContext hook =========== //

// 獨立的子表單
const EmailsForm: React.FC = () => {
  const { setValue, getValues } = useFormContext<FormSample2>()
  const handleEmailsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('emails form event =>', event)
    // 更新父表單值
    const emailValue = getValues('emails.email1') || ''
    setValue('emails', { email1: emailValue })
  }

  return (
    <form onSubmit={handleEmailsSubmit}>
      <FormInput<FormSample2>
        name="emails.email1"
        label="電子郵件一"
        isRequired={true}
        rules={{ required: '請輸入電子郵件' }}
      />
      <Button type="submit" mt={4}>
        提交電子郵件
      </Button>
    </form>
  )
}
const FormOfFormUseFormContext: React.FC = () => {
  const userFormMethods = useForm<FormSample2>({
    defaultValues: {
      name: '',
      age: '',
      telephone: '',
      emails: {
        email1: '',
      },
    },
  })

  const handleUserFormSubmit = (data: FormSample2) => {
    console.log('user form data', data)
  }
  return (
    <FormProvider {...userFormMethods}>
      <form onSubmit={userFormMethods.handleSubmit(handleUserFormSubmit)}>
        <FormInput<FormSample2>
          name="name"
          isRequired={true}
          label="姓名"
          rules={{ required: '請輸入姓名' }}
        />
        <FormInput<FormSample2>
          name="age"
          isRequired={true}
          label="年齡"
          rules={{ required: '請輸入年齡' }}
        />
        <FormInput<FormSample2>
          name="telephone"
          isRequired={true}
          label="電話"
          rules={{ required: '請輸入電話' }}
        />
        <Button type="submit">確認</Button>
      </form>

      {/* 子表單 */}
      <Box mt={4} borderWidth="1px" p={4} borderRadius="md">
        <EmailsForm />
      </Box>
    </FormProvider>
  )
}
