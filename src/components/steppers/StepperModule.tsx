import { Box, Button, useSteps } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import { StepsItem, StepsList, StepsRoot } from '../ui/steps'
import { generateArray } from '../../utils/array-utils'
import { useState } from 'react'

interface StepperProps {
  // 每個步驟內容
  children: ReactNode
  // 當前步驟，由父層控制
  currentStep: number
  // 總步驟數
  totalSteps?: number
  // 下一步回調
  onNext: () => void
  // 上一步回調
  onPrevious: () => void
  // 是否禁用 "Next" 按鈕
  isNextDisabled?: boolean
  // 是否禁用 "Previous" 按鈕
  isPreviousDisabled?: boolean
}

const StepperModule = ({
  children,
  currentStep = 1,
  totalSteps = children.length,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
}: StepperProps) => {
  const { value, goToNextStep, goToPrevStep } = useSteps({
    defaultStep: 0, // 設置初始步驟
  })
  const totalStepsInfo = generateArray(totalSteps)
  return (
    <Box>
      <StepsRoot>
        <StepsList>
          {totalStepsInfo.map((step, index) => (
            <StepsItem
              key={index}
              index={index}
              title={`Step ${step}`}
              isActive={value === index}
            />
          ))}
        </StepsList>
        {/* 當前步驟內容 */}
        <Box style={{ marginTop: '1rem' }}>{children}</Box>
        {/* 控制按鈕 */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            onClick={onPrevious}
            disabled={isPreviousDisabled || currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={isNextDisabled || currentStep === totalSteps}
          >
            Next
          </Button>
        </Box>
      </StepsRoot>
    </Box>
  )
}

export default StepperModule
