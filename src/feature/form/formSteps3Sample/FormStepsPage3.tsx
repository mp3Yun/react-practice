import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import StepperFormModule from '../../../components/steppers/StepperFormModule'
import { StepProps, useMultiStepForm2 } from '../../../hooks/UseMultiStepForm2'
import { flattenArray } from '../../../utils/array-utils'
import { validateForm } from '../../../utils/form-utils'
import { flattenObject } from '../../../utils/object-utils'
import Step1Form, { FormStep1, step1FormData } from './Step1Form'
import Step2Form, { FormStep2, step2FormData } from './Step2Form'

const FormSteps3Page: React.FC = () => {
  const steps: StepProps<FormStep1 | FormStep2>[] = [
    {
      stepInfo: { index: 0, title: '步驟一', description: '個人資料' },
      defaultValues: step1FormData,
    },
    {
      stepInfo: { index: 1, title: '步驟二', description: '連略資料' },
      defaultValues: step2FormData,
    },
    {
      stepInfo: { index: 2, title: '步驟三', description: '確認資料' },
      defaultValues: { ...step1FormData, ...step2FormData },
    },
  ]
  const [currentStepData, setCurrentStep] = useState(steps[0].stepInfo)
  const currentStep = currentStepData.index
  const { stepData, setStepData, formMethods } = useMultiStepForm2(
    steps,
    currentStep,
    setCurrentStep
  )

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      // 加入檢查驗證
      const checkValidation = await validateForm(formMethods)
      if (!checkValidation) return
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => steps[prev.index + 1].stepInfo)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => steps[prev.index - 1].stepInfo)
    }
  }

  return (
    <StepperFormModule
      currentStep={currentStepData}
      totalSteps={steps.map((step) => step.stepInfo)}
      onNext={() => {
        if (currentStep === 2) {
          // TODO: 變更步驟的狀態
        } else {
          nextStep()
        }
      }}
      onPrevious={() => prevStep()}
      isNextDisabled={currentStep === 2}
      isPreviousDisabled={currentStep === 0}
    >
      {currentStep === 0 && (
        <FormProvider {...formMethods}>
          <Step1Form></Step1Form>
        </FormProvider>
      )}

      {currentStep === 1 && (
        <FormProvider {...formMethods}>
          <Step2Form></Step2Form>
        </FormProvider>
      )}

      {currentStep === 2 && (
        <Box>
          <h3>Step 3</h3>
          <Box>
            {Object.entries(
              flattenObject({
                ...stepData[0],
                ...stepData[1],
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

      {/* TODO: */}
      {/* {currentStep === 3 && (
        <Box>
          <h3>完成作業</h3>
        </Box>
      )} */}
    </StepperFormModule>
  )
}

export default FormSteps3Page
