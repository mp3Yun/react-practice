import { useSteps } from '@chakra-ui/react'
import { StepperInfo } from '../components/steppers/Stepper'

export const useStepper = (
  currentStep: StepperInfo,
  totalSteps: StepperInfo[]
) => {
  const steps = totalSteps.map((item) => {
    const { index } = item
    const isCurrentStep = index === currentStep.index

    const status = isCurrentStep
      ? currentStep.status || 'active'
      : index < currentStep.index
        ? 'completed'
        : 'active'

    return {
      title: item.title,
      description: item.description,
      status,
    }
  })

  const { activeStep, setActiveStep } = useSteps({
    index: currentStep.index,
    count: totalSteps.length,
  })

  return { activeStep, steps, setActiveStep }
}
