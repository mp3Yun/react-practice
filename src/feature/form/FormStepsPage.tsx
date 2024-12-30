import React, { useState } from 'react'
import StepperModule from '../../components/steppers/StepperModule'
import { Box, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../../components/formInput/FormInput'

// 假設我的所有表單資料如下:
const myFormData = {
  name: '',
  gender: '',
  age: '',
  telephone: '',
  address: [],
  familys: {
    member1: '',
    member2: '',
  },
}
// 我將此份表單，拆成2步驟來填資料
const step1FormData = {
  name: '',
  gender: '',
  age: '',
  telephone: '',
}
const step2FormData = {
  address: [],
  familys: {
    member1: '',
    member2: '',
  },
}
interface FormData {
  step1: typeof step1FormData
  step2: typeof step2FormData
  step3: object
}
const FormStepsPage: React.FC = () => {
  const defaultForm = {
    step1: step1FormData,
    step2: step2FormData,
    step3: {}, // for show all form data
  }
  const methods = useForm<FormData>({
    defaultValues: defaultForm,
  })

  const [currentIndex, setCurretnIndex] = useState(1)

  const handleSubmit = (step: number) => {
    switch (step) {
      case 1:
        methods.handleSubmit(handleStep1Submit)()
        setCurretnIndex(step)
        break
      case 2:
        methods.handleSubmit(handleStep2Submit)()
        setCurretnIndex(step)
        break
      default:
        break
    }
  }

  const handleStep1Submit = (data: FormData) => {
    console.log('Form Data Submitted:', data)
    // 你可以選擇根據需求來設定每個步驟的資料
    methods.setValue('step1', data.step1)
  }

  const handleStep2Submit = (data: FormData) => {
    console.log('Form Data Submitted:', data)
    // 你可以選擇根據需求來設定每個步驟的資料
    methods.setValue('step2', data.step2)
  }

  return (
    <FormProvider {...methods}>
      <StepperModule
        initialStep={currentIndex}
        onStepChange={(step, action) => {
          console.log('onStepChange', step, action)
        }}
        onStepValidation={async (step, action) => {
          handleSubmit(step)
          const tmpStep = `step${step}` as unknown as keyof FormData
          const result = await methods.trigger(tmpStep)
          console.error('onStepValidation step check', result)
          return result
        }}
      >
        <Box>
          <h3>Step 1</h3>
          <form name="step1">
            <FormInput<FormData>
              control={methods.control}
              name="step1.name"
              isRequired={true}
              label="姓名"
              rules={{ required: '請輸入姓名' }}
            ></FormInput>
            <FormInput<FormData>
              control={methods.control}
              name="step1.gender"
              isRequired={true}
              label="性別"
              rules={{ required: '請輸入性別' }}
            ></FormInput>
            <FormInput<FormData>
              control={methods.control}
              name="step1.age"
              isRequired={true}
              label="年齡"
              rules={{ required: '請輸入年齡' }}
            ></FormInput>
            <FormInput<FormData>
              control={methods.control}
              name="step1.telephone"
              isRequired={true}
              label="電話"
              rules={{ required: '請輸入電話' }}
            ></FormInput>
          </form>
        </Box>
        <Box>
          <h3>Step 2</h3>
          <form name="step2">
            <FormInput<FormData>
              control={methods.control}
              name="step2.address"
              isRequired={true}
              label="地址"
              rules={{ required: '請輸入地址' }}
            ></FormInput>
            <FormInput<FormData>
              control={methods.control}
              name="step2.familys.member1"
              isRequired={true}
              label="家人1"
              rules={{ required: '請輸入家人1' }}
            ></FormInput>
            <FormInput<FormData>
              control={methods.control}
              name="step2.familys.member2"
              isRequired={true}
              label="家人2"
              rules={{ required: '請輸入家人2' }}
            ></FormInput>
          </form>
        </Box>
        <Box>
          <h3>Step 3</h3>
          <Box>
            {/* {Object.entries(flattenObject(methods.getValues()) || {}).map(
              (value: any, index: number) => (
                <Box key={index}>
                  <Text>{value}</Text>
                </Box>
              )
            )} */}
          </Box>
        </Box>
      </StepperModule>
    </FormProvider>
  )
}

export default FormStepsPage
