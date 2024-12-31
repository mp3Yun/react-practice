import React, { useRef, useState } from 'react'
import StepperModule from '../../components/steppers/StepperModule'
import { Box, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../../components/formInput/FormInput'
import { validateForm } from '../../utils/form-utils'

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
type FormStep1 = typeof step1FormData
type FormStep2 = typeof step2FormData
const FormStepsPage: React.FC = () => {
  const form1methods = useForm<FormStep1>({
    defaultValues: step1FormData,
  })
  const form2methods = useForm<FormStep2>({
    defaultValues: step2FormData,
  })

  const [currentIndex, setCurretnIndex] = useState(0)

  const handleStepValidation = async (step: number) => {
    switch (step) {
      case 1: {
        return validateForm(form1methods)
      }
      case 2: {
        console.log('step2 data form2methods', form2methods.getValues())
        return validateForm(form2methods)
      }
      default:
        return true // 默認返回 true
    }
  }

  const handleSubmit = (step: number, stepAction: 'next' | 'prev' = 'next') => {
    if (stepAction === 'next') {
      console.log('handleSubmit step', step)
      handleStepValidation(step).then((isValid) => {
        console.log('handleSubmit isValid', isValid)
        if (isValid) {
          setCurretnIndex(step)
        }
      })
    } else if (currentIndex !== 0) {
      setCurretnIndex(step)
    }
  }

  return (
    <StepperModule
      currentStep={currentIndex}
      totalSteps={3}
      onNext={() => handleSubmit(currentIndex + 1, 'next')}
      onPrevious={() => handleSubmit(currentIndex - 1, 'prev')}
      isNextDisabled={currentIndex === 2}
      isPreviousDisabled={currentIndex === 0}
    >
      <FormProvider {...form1methods}>
        <Box>
          <h3>Step 1</h3>
          <form name="step1">
            <FormInput<FormStep1>
              control={form1methods.control}
              name="name"
              isRequired={true}
              label="姓名"
              rules={{ required: '請輸入姓名' }}
            ></FormInput>
            <FormInput<FormStep1>
              control={form1methods.control}
              name="gender"
              isRequired={true}
              label="性別"
              rules={{ required: '請輸入性別' }}
            ></FormInput>
            <FormInput<FormStep1>
              control={form1methods.control}
              name="age"
              isRequired={true}
              label="年齡"
              rules={{ required: '請輸入年齡' }}
            ></FormInput>
            <FormInput<FormStep1>
              control={form1methods.control}
              name="telephone"
              isRequired={true}
              label="電話"
              rules={{ required: '請輸入電話' }}
            ></FormInput>
          </form>
        </Box>
      </FormProvider>

      <FormProvider {...form2methods}>
        <Box>
          <h3>Step 2</h3>
          <form name="step2">
            <FormInput<FormStep2>
              control={form2methods.control}
              name="address"
              isRequired={true}
              label="地址"
              rules={{ required: '請輸入地址' }}
            ></FormInput>
            <FormInput<FormStep2>
              control={form2methods.control}
              name="familys.member1"
              isRequired={true}
              label="家人1"
              rules={{ required: '請輸入家人1' }}
            ></FormInput>
            <FormInput<FormStep2>
              control={form2methods.control}
              name="familys.member2"
              isRequired={true}
              label="家人2"
              rules={{ required: '請輸入家人2' }}
            ></FormInput>
          </form>
        </Box>
      </FormProvider>

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
  )
}

export default FormStepsPage
