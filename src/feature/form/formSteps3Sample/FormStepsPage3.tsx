import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import StepperModule from '../../../components/steppers/StepperModule'
import { useMultiStepForm } from '../../../hooks/UseMultiStepForm'
import Step1Form, { step1FormData } from './Step1Form'
import Step2Form, { step2FormData } from './Step2Form'
import { flattenObject } from '../../../utils/object-utils'
import { flattenArray } from '../../../utils/array-utils'

const FormSteps3Page: React.FC = () => {
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

export default FormSteps3Page
