import { Button, Box, Group, Text } from '@chakra-ui/react'
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsContent,
  StepsPrevTrigger,
  StepsNextTrigger,
  StepsCompletedContent,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

interface Props {
  currentStep: number | StepperInfo
  totalSteps: number | StepperInfo[]
}

export interface StepperInfo {
  index: number
  title: string
  description: string
  status?: 'completed' | 'active' | 'pending'
}

const Stepper: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const stepIsObject = typeof currentStep === 'object'

  const totalStepsIsObject =
    Array.isArray(totalSteps) && typeof totalSteps[0] === 'object'
  const steps = Array.from(
    { length: Array.isArray(totalSteps) ? totalSteps.length : totalSteps },
    (_, index) => index + 1
  ).map((item) => {
    if (typeof currentStep === 'object' && totalStepsIsObject) {
      const tmpStep = totalSteps.find((step) => step.index === item - 1)
      return {
        title: tmpStep?.title || `Step ${item}`,
        description: tmpStep?.description || `This is step ${item}`,
      }
    }
    return {
      title: `Step ${item}`,
      description: `This is step ${item}`,
    }
  })

  const [activeStep, setActiveStep] = useState(
    stepIsObject ? currentStep.index : currentStep
  )

  useEffect(() => {
    setActiveStep(stepIsObject ? currentStep.index : currentStep)
  }, [currentStep])

  // const nextStep = () => {
  //   if (activeStep < steps.length - 1) {
  //     setActiveStep(activeStep + 1)
  //   }
  // }

  // const prevStep = () => {
  //   if (activeStep > 0) {
  //     setActiveStep(activeStep - 1)
  //   }
  // }

  return (
    <StepsRoot defaultValue={activeStep} count={steps.length}>
      <StepsList>
        {steps.map((step, index) => (
          <StepsItem key={index} index={index} title={step.title} />
        ))}
      </StepsList>

      {steps.map((step, index) => (
        <StepsContent key={index} index={index}>
          <Box>
            <Text fontSize="xl" mb={4}>
              {step.title}
            </Text>
            <Text>{step.description}</Text>
          </Box>
        </StepsContent>
      ))}

      <StepsCompletedContent>All steps are complete!</StepsCompletedContent>

      {/* <Group spacing={4} mt={4}>
        <StepsPrevTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            isDisabled={activeStep === 0}
          >
            Prev
          </Button>
        </StepsPrevTrigger>
        <StepsNextTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStep}
            isDisabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </StepsNextTrigger>
      </Group> */}
    </StepsRoot>
  )
}

export default Stepper
