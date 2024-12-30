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
  useSteps,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface Props {
  currentStep: number | StepperInfo
  totalSteps: number
}

export interface StepperInfo {
  index: number
  title: string
  description: string
}

const Stepper: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const stepIsObject = typeof currentStep === 'object'
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1).map(
    (item) => {
      if (typeof currentStep === 'object') {
        return {
          title: currentStep.title,
          description: currentStep.description,
        }
      }
      return {
        title: `Step ${item}`,
        description: `This is step ${item}`,
      }
    }
  )
  const { activeStep, setActiveStep } = useSteps({
    index: stepIsObject ? currentStep.index : currentStep,
    count: steps.length,
  })

  useEffect(() => {
    setActiveStep(stepIsObject ? currentStep.index : currentStep)
  }, [currentStep])

  return (
    <ChakraStepper size="lg" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
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

export default Stepper
