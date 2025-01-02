import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import StepperModule from '../../../components/steppers/StepperModule'
import { useMultiStepForm } from '../../../hooks/UseMultiStepForm'
import Step1Form, { step1FormData } from './Step1Form'
import Step2Form, { step2FormData } from './Step2Form'
import { flattenObject } from '../../../utils/object-utils'
import { flattenArray } from '../../../utils/array-utils'

const FormSteps2Page: React.FC = () => {
  // // 用於存儲每個步驟的數據
  // const [step1Data, setStep1Data] = useState<FormStep1 | undefined>(undefined)
  // const [step2Data, setStep2Data] = useState<FormStep2 | null>(null)
  // const [currentIndex, setCurretnIndex] = useState(0)

  // const form1methods = useForm<FormStep1>({
  //   defaultValues: step1Data || step1FormData,
  // })
  // const form2methods = useForm<FormStep2>({
  //   defaultValues: step2Data || step2FormData,
  // })

  // const handleStepValidation = async (step: number) => {
  //   switch (step) {
  //     case 1: {
  //       return validateForm(form1methods)
  //     }
  //     case 2: {
  //       return validateForm(form2methods)
  //     }
  //     default:
  //       return true // 默認返回 true
  //   }
  // }

  // const handleSubmit = (step: number, stepAction: 'next' | 'prev' = 'next') => {
  //   if (stepAction === 'next') {
  //     console.log('handleSubmit step', step)
  //     handleStepValidation(step).then((isValid) => {
  //       console.log('handleSubmit isValid', isValid)
  //       if (isValid) {
  //         if (step === 1) {
  //           // 儲存步驟一的數據
  //           setStep1Data(form1methods.getValues())
  //           form1methods.reset(step1FormData)
  //         } else if (step === 2) {
  //           // 儲存步驟二的數據
  //           setStep2Data(form2methods.getValues())
  //           form2methods.reset(step2FormData)
  //         }
  //         setCurretnIndex(step)
  //       }
  //     })
  //   } else if (currentIndex !== 0) {
  //     setCurretnIndex(step)
  //     if (step1Data) form1methods.reset(step1Data)
  //     if (step2Data) form2methods.reset(step2Data)
  //   }
  // }

  const steps = [
    { defaultValues: step1FormData },
    { defaultValues: step2FormData },
    { defaultValues: { ...step1FormData, ...step2FormData } },
  ]
  const { currentStep, stepData, formMethods, nextStep, prevStep } =
    useMultiStepForm(steps)

  return (
    <StepperModule
      currentStep={currentStep}
      totalSteps={steps.length}
      onNext={() => {
        if (currentStep === 2) {
          alert('最後一步')
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
    </StepperModule>
  )
}

export default FormSteps2Page
