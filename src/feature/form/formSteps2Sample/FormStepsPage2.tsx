import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import StepperModule from '../../../components/steppers/StepperModule'
import { flattenArray } from '../../../utils/array-utils'
import { validateForm } from '../../../utils/form-utils'
import { flattenObject } from '../../../utils/object-utils'
import Step1Form, { FormStep1, step1FormData } from './Step1Form'
import Step2Form, { FormStep2, step2FormData } from './Step2Form'

const FormSteps2Page: React.FC = () => {
  // 用於存儲每個步驟的數據
  const [step1Data, setStep1Data] = useState<FormStep1 | undefined>(undefined)
  const [step2Data, setStep2Data] = useState<FormStep2 | null>(null)
  const [currentIndex, setCurretnIndex] = useState(0)

  const form1methods = useForm<FormStep1>({
    defaultValues: step1Data || step1FormData,
  })
  const form2methods = useForm<FormStep2>({
    defaultValues: step2Data || step2FormData,
  })

  const handleStepValidation = async (step: number) => {
    switch (step) {
      case 1: {
        return validateForm(form1methods)
      }
      case 2: {
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
      if (step1Data) form1methods.reset(step1Data)
      if (step2Data) form2methods.reset(step2Data)
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
      {currentIndex === 0 && (
        <FormProvider {...form1methods}>
          <Step1Form></Step1Form>
        </FormProvider>
      )}

      {currentIndex === 1 && (
        <FormProvider {...form2methods}>
          <Step2Form></Step2Form>
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
