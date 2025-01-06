import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'
import { StepperInfo } from '../../../components/steppers/Stepper'
import StepperFormModule from '../../../components/steppers/StepperFormModule'
import { StepProps, useMultiStepForm2 } from '../../../hooks/UseMultiStepForm2'
import { flattenArray } from '../../../utils/array-utils'
import { validateForm } from '../../../utils/form-utils'
import { flattenObject } from '../../../utils/object-utils'
import Step1Form, { step1FormData } from './Step1Form'
import Step2Form, { step2FormData } from './Step2Form'

const FormSteps3Page: React.FC = () => {
  const stepInfos: StepperInfo[] = [
    { index: 0, title: '步驟一', description: '個人資料' },
    { index: 1, title: '步驟二', description: '連略資料' },
    { index: 2, title: '步驟三', description: '確認資料' },
  ]
  const steps: StepProps<any>[] = [
    { defaultValues: step1FormData },
    { defaultValues: step2FormData },
    { defaultValues: { ...step1FormData, ...step2FormData } },
  ]
  const [currentStepData, setCurrentStep] = useState(stepInfos[0])
  const currentStep = currentStepData.index

  const onStepChange = (step: number) => {
    setCurrentStep(stepInfos[step])
  }

  const { stepData, setStepData, formMethods, resetAll } = useMultiStepForm2(
    steps,
    currentStep,
    onStepChange
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      // 加入檢查驗證
      const checkValidation = await validateForm(formMethods)
      if (!checkValidation) return
      // console.log('currentStep', currentStep)
      // console.log('formMethods', formMethods.getValues())
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => stepInfos[prev.index + 1])
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => stepInfos[prev.index - 1])
    }
  }

  const comfirmDialog = () => {
    setCurrentStep({
      index: 3,
      title: '',
      description: '',
      status: 'completed',
    })
    resetAll() // 我這邊重新設定後，為什麼這一頁的離開訊息還是 popup 了?! TODO:
    onClose()
  }

  const renderAllData = (data: any) => {
    return Object.entries(flattenObject(data)).map(([key, value], index) => (
      <Box key={index}>
        {Array.isArray(value) ? (
          flattenArray(value).map((item, idx) => (
            <Text key={idx}>
              {key}: {item}
            </Text>
          ))
        ) : (
          <Text>
            {key}: {value}
          </Text>
        )}
      </Box>
    ))
  }

  const isCompletedAllData =
    currentStep === 3 && currentStepData.status === 'completed' ? false : true

  return (
    <>
      <StepperFormModule
        currentStep={currentStepData}
        totalSteps={stepInfos}
        onNext={async () => {
          if (currentStep === 2 || currentStep === 3) {
            setCurrentStep({ ...currentStepData, index: 3 })
            onOpen()
          } else {
            nextStep()
          }
        }}
        onPrevious={() => prevStep()}
        isNextDisabled={currentStep === 2}
        isPreviousDisabled={currentStep === 0}
        isShowNextButton={isCompletedAllData}
        isShowPreviousButton={isCompletedAllData}
      >
        {currentStep === 0 && (
          <FormProvider {...formMethods}>
            <form>
              <Step1Form></Step1Form>
            </form>
          </FormProvider>
        )}

        {currentStep === 1 && (
          <FormProvider {...formMethods}>
            <Step2Form></Step2Form>
          </FormProvider>
        )}

        {(currentStep === 2 ||
          (currentStep === 3 && currentStepData.status !== 'completed')) && (
          <Box>
            <h3>Step 3</h3>
            <Box>{renderAllData({ ...stepData[0], ...stepData[1] })}</Box>
          </Box>
        )}

        {currentStep === 3 && currentStepData.status === 'completed' && (
          <Flex direction="column" justify="center" align="center" h="40vh">
            <Box textAlign="center">
              <Text>完成作業</Text>
            </Box>
            <Box mt={4}>
              <Button
                onClick={() => {
                  setCurrentStep(stepInfos[0])
                }}
              >
                回到表單
              </Button>
            </Box>
          </Flex>
        )}
      </StepperFormModule>

      {/* 訊息確認窗 */}
      <Box>
        <ConfirmDialog
          isOpen={isOpen}
          onConfirm={comfirmDialog}
          onClose={() => {
            setCurrentStep({ ...currentStepData, index: 2 })
            onClose()
          }}
          confirmTitle={'確認資料'}
          confirmMessage={'所有資料皆正確嗎?'}
        >
          <Box>{renderAllData({ ...stepData[0], ...stepData[1] })}</Box>
        </ConfirmDialog>
      </Box>
    </>
  )
}

export default FormSteps3Page
