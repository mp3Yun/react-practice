import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { StepsContent, StepsItem, StepsList } from '../ui/steps'
import { StepperInfo } from './Stepper'

interface Props {
  currentStep: StepperInfo
  totalSteps: StepperInfo[]
}

const Stepper2: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <Box>
      <StepsList>
        {totalSteps.map((step, index) => (
          <StepsItem key={index} index={index} title={`step${index + 1}`} />
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
    </Box>
  )
}

export default Stepper2
