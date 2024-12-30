import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import { useState } from 'react'
import Stepper, { StepperInfo } from './Stepper'

interface StepperProps {
  // 每個步驟內容
  children: ReactNode[]
  // 初始步驟，默認為 1
  initialStep?: number | StepperInfo
  // 切換下一步時，通知父層
  onStepChange?: (step: number, action: string) => void
  // 檢核回調
  onStepValidation?: (
    step: number,
    action: string
  ) => boolean | Promise<boolean>
}

const StepperModule = ({
  children,
  initialStep = 1,
  onStepChange,
  onStepValidation,
}: StepperProps) => {
  const totalSteps = children.length // 總步驟數
  const [currentStep, setCurrentStep] = useState(initialStep)
  const currentIndex =
    typeof currentStep === 'object' ? currentStep.index : currentStep

  // 處理檢核邏輯
  const validateStep = async (action: string) => {
    console.log('validateStep')
    if (onStepValidation) {
      const result = await onStepValidation(currentIndex, action)
      console.log('check validateStep result =>', result)
      return result // 如果檢核失敗，則返回 false
    }
    return true // 默認通過檢核
  }
  const handleNext = async () => {
    const isValid = await validateStep('Next')
    if (isValid && currentIndex < totalSteps) {
      setCurrentStep(currentIndex + 1)
      if (onStepChange) onStepChange(currentIndex + 1, 'Next')
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setCurrentStep(currentIndex - 1)
      if (onStepChange) onStepChange(currentIndex - 1, 'Previous')
    }
  }
  return (
    <Box>
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />
      {/* 當前步驟內容 */}
      <Box style={{ marginTop: '1rem' }}>{children[currentIndex - 1]}</Box>
      {/* 控制按鈕 */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === totalSteps}>
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default StepperModule
