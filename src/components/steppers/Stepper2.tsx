import {
  Box,
  Stepper as ChakraStepper,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useStepper } from '../../hooks/UseStepper'
import { StepperInfo } from './Stepper'
interface Props {
  currentStep: StepperInfo
  totalSteps: StepperInfo[]
  isAllStepsCompleted: boolean
}

const Stepper2: React.FC<Props> = ({
  currentStep,
  totalSteps,
  isAllStepsCompleted,
}) => {
  const { activeStep, steps, setActiveStep } = useStepper(
    currentStep,
    totalSteps
  )

  useEffect(() => {
    if (isAllStepsCompleted) {
      setActiveStep(currentStep.index + 1)
      console.log('Received Next button click from parent!')
    }
  }, [isAllStepsCompleted])

  return (
    <ChakraStepper size="lg" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={
                currentStep.status === 'completed' &&
                currentStep.index === activeStep ? (
                  <StepIcon />
                ) : (
                  <StepNumber />
                )
              }
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </ChakraStepper>
  )
}

export default Stepper2
