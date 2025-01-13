import { Box, Button, Flex, StepsRoot } from '@chakra-ui/react'
import { ReactNode } from '@tanstack/react-router'
import { StepperInfo } from './Stepper'
import Stepper2 from './Stepper2'
import { useStepper } from '../../hooks/UseStepper'

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
  // 是否顯示 "Next" 按鈕
  isShowNextButton?: boolean
  // 是否顯示 "Previous" 按鈕
  isShowPreviousButton?: boolean
}

const StepperFormModule = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
  isShowNextButton = true,
  isShowPreviousButton = true,
}: StepperFormProps) => {
  const { activeStep, steps } = useStepper(currentStep, totalSteps)
  return (
    <StepsRoot defaultValue={activeStep} count={steps.length}>
      <Stepper2 currentStep={currentStep} totalSteps={totalSteps} />
      {/* 當前步驟內容 */}
      <Box style={{ marginTop: '1rem', flex: 1 }}>{children}</Box>
      {/* 控制按鈕 */}
      <Flex mt={4} justifyContent="space-between">
        {isShowPreviousButton && (
          <Button
            onClick={onPrevious}
            disabled={isPreviousDisabled || currentStep.index === 0}
          >
            Previous
          </Button>
        )}
        {isShowNextButton && (
          <Button
            onClick={onNext}
            disabled={
              isNextDisabled || currentStep.index === totalSteps.length - 1
            }
          >
            Next
          </Button>
        )}
      </Flex>
    </StepsRoot>
  )
}

export default StepperFormModule
