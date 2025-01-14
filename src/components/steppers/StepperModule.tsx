import { Box, Button, Group } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import { generateArray } from '../../utils/array-utils'
import {
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from '../ui/steps'

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
  currentStep = 0,
  totalSteps = children.length,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
}: StepperProps) => {
  const totalStepsInfo = generateArray(totalSteps)
  console.log('99-我是StepperModule ======')
  console.log('99-currentStep', currentStep)
  console.log('99-totalSteps', totalSteps)
  return (
    <Box>
      <StepsRoot
        defaultValue={currentStep}
        count={totalSteps}
        step={currentStep}
        onStepChange={(e) => console.log('onStepChange e', e)}
      >
        <StepsList>
          {totalStepsInfo.map((step, index) => (
            <StepsItem
              key={index}
              index={index}
              title={`Step ${step}`}
              // isCompleted={currentStep > index}
            />
          ))}
        </StepsList>
        {/* 當前步驟內容 */}
        <Box style={{ marginTop: '1rem' }}>{children}</Box>
        {/* 控制按鈕 */}
        <Group mt={4} display="flex" justifyContent="space-between">
          <StepsPrevTrigger asChild>
            <Button
              onClick={onPrevious}
              disabled={isPreviousDisabled || currentStep === 0}
            >
              Previous
            </Button>
          </StepsPrevTrigger>
          <StepsNextTrigger asChild>
            <Button
              onClick={onNext}
              disabled={isNextDisabled || currentStep === totalSteps + 1 + 1}
            >
              Next
            </Button>
          </StepsNextTrigger>
        </Group>
      </StepsRoot>
    </Box>
  )
}

export default StepperModule
