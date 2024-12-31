import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import FormInput from '../../components/formInput/FormInput'
import StepperModule from '../../components/steppers/StepperModule'
import { flattenArray } from '../../utils/array-utils'
import { validateForm } from '../../utils/form-utils'
import { flattenObject } from '../../utils/object-utils'

// 假設我的所有表單資料如下:
const myFormData = {
  name: '',
  gender: '',
  age: '',
  telephone: '',
  address: [],
  family: {
    member1: '',
    member2: '',
  },
}
type FormStep1 = typeof step1FormData
type FormStep2 = {
  address: { id: number; value: string }[]
  family: {
    member1: string
    member2: string
  }
  email: string
}
// 我將此份表單，拆成2步驟來填資料
const step1FormData = {
  name: '',
  gender: '',
  age: '',
  telephone: '',
}
const step2FormData: FormStep2 = {
  address: [{ id: 1, value: '烏拉拉' }],
  family: {
    member1: '',
    member2: '',
  },
  email: '',
}

const FormSteps2Page: React.FC = () => {
  // 用於存儲每個步驟的數據
  const [step1Data, setStep1Data] = useState<FormStep1 | null>(null)
  const [step2Data, setStep2Data] = useState<FormStep2 | null>(null)
  const [currentIndex, setCurretnIndex] = useState(0)
  // 分別控制各表單
  const form1methods = useForm<FormStep1>({
    defaultValues: step1Data || step1FormData,
  })
  const form2methods = useForm<FormStep2>({
    defaultValues: step2Data || step2FormData,
  })
  const { fields, append, remove } = useFieldArray({
    control: form2methods.control,
    name: 'address', // 地址對應的陣列名稱
  })

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
          if (step === 1) {
            // 儲存步驟一的數據
            setStep1Data(form1methods.getValues())
            form1methods.reset(step1FormData)
          } else if (step === 2) {
            // 儲存步驟二的數據
            setStep2Data(form2methods.getValues())
            form2methods.reset(step2FormData)
          }
          setCurretnIndex(step)
        }
      })
    } else if (currentIndex !== 0) {
      setCurretnIndex(step)
    }
  }

  useEffect(() => {
    // 重新渲染畫面，取得先前的值
    console.log('currentIndex', currentIndex)
    if (currentIndex === 0 && step1Data) {
      form1methods.reset(step1Data)
    } else if (currentIndex === 1 && step2Data) {
      form2methods.reset(step2Data)
    }
  }, [currentIndex])

  return (
    <StepperModule
      currentStep={currentIndex}
      totalSteps={3}
      onNext={() => handleSubmit(currentIndex + 1, 'next')}
      onPrevious={() => handleSubmit(currentIndex - 1, 'prev')}
      isNextDisabled={currentIndex === 2}
      isPreviousDisabled={currentIndex === 0}
    >
      {currentIndex === 0 && (
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
      )}

      {currentIndex === 1 && (
        <FormProvider {...form2methods}>
          <Box>
            <h3>Step 2</h3>
            <form name="step2">
              <Box my={2}>
                {fields.map((field, index) => (
                  <Box key={field.id}>
                    <FormInput<FormStep2>
                      control={form2methods.control}
                      name={`address.${index}.value`}
                      label={`地址 ${index + 1}`}
                      isRequired={true}
                      rules={{ required: '請輸入地址' }}
                    />
                    <Button
                      onClick={() => remove(index)}
                      colorScheme="red"
                      size="sm"
                    >
                      刪除
                    </Button>
                  </Box>
                ))}

                <Button
                  onClick={() => append({ id: fields.length, value: '' })} // 新增一個空地址
                  colorScheme="blue"
                  size="sm"
                  mt={4}
                >
                  新增地址
                </Button>
              </Box>

              <FormInput<FormStep2>
                control={form2methods.control}
                name="family.member1"
                isRequired={true}
                label="家人1"
                rules={{ required: '請輸入家人1' }}
              ></FormInput>
              <FormInput<FormStep2>
                control={form2methods.control}
                name="family.member2"
                isRequired={true}
                label="家人2"
                rules={{ required: '請輸入家人2' }}
              ></FormInput>
              <FormInput<FormStep2>
                control={form2methods.control}
                name="email"
                isRequired={true}
                label="信箱"
                rules={{ required: '請輸入信箱' }}
              ></FormInput>
            </form>
          </Box>
        </FormProvider>
      )}

      {currentIndex === 2 && (
        <Box>
          <h3>Step 3</h3>
          <Box>
            {Object.entries(
              flattenObject({
                ...step1Data,
                ...step2Data,
              }) || {}
            ).map(([key, value], index: number) => (
              <Box key={index}>
                {Array.isArray(value) ? (
                  flattenArray(value).map((item, index) => (
                    <Text key={index}>
                      {key}:{item}
                    </Text>
                  ))
                ) : (
                  <Text>
                    {key}:{value}
                  </Text>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </StepperModule>
  )
}

export default FormSteps2Page
