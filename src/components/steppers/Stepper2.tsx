import {
  Box,
  Text,
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from '@chakra-ui/react'
import React from 'react'
import { useStepper } from '../../hooks/UseStepper'
import { StepperInfo } from './Stepper'

interface Props {
  currentStep: StepperInfo
  totalSteps: StepperInfo[]
}

const Stepper2: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const { activeStep, steps } = useStepper(currentStep, totalSteps)
  return (
    <StepsRoot defaultValue={activeStep} count={steps.length}>
      <StepsList>
        {totalSteps.map((step, index) => (
          <StepsItem key={index} index={index} title={step.title} />
        ))}
      </StepsList>

      {totalSteps.map((step, index) => (
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
    </StepsRoot>
  )
}

export default Stepper2
