import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import Stepper, { StepperInfo } from './Stepper'

interface StepperFormProps {
  // 每個步驟內容
  children: ReactNode
  // 當前步驟，由父層控制
  currentStep: StepperInfo
  // 總步驟數
  totalSteps: StepperInfo[]
  // 下一步回調
  onNext: () => void
  // 上一步回調
  onPrevious: () => void
  // 是否禁用 "Next" 按鈕
  isNextDisabled?: boolean
  // 是否禁用 "Previous" 按鈕
  isPreviousDisabled?: boolean
}

const StepperFormModule = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
}: StepperFormProps) => {
  return (
    <Box>
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />
      {/* 當前步驟內容 */}
      <Box style={{ marginTop: '1rem' }}>{children}</Box>
      {/* 控制按鈕 */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          onClick={onPrevious}
          disabled={isPreviousDisabled || currentStep.index === 0}
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={
            isNextDisabled || currentStep.index === totalSteps.length - 1
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default StepperFormModule
