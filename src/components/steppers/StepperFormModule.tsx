import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import { StepperInfo } from './Stepper'
import Stepper2 from './Stepper2'
import { useState } from 'react'

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
  // 是否完成所有步驟
  isAllStepsCompleted?: boolean
}

const StepperFormModule = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
  isAllStepsCompleted = false,
}: StepperFormProps) => {
  console.error('我是 stepper 模組 isAllStepsCompleted', isAllStepsCompleted)
  return (
    <Box>
      <Stepper2
        currentStep={currentStep}
        totalSteps={totalSteps}
        isAllStepsCompleted={isAllStepsCompleted}
      />
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
          onClick={() => {
            onNext()
          }}
          disabled={isNextDisabled || currentStep.index === totalSteps.length}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default StepperFormModule
