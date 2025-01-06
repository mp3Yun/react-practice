import { useMemo } from 'react'
import { StepperInfo } from '../components/steppers/Stepper'

export const useStepper = (
  currentStep: StepperInfo,
  totalSteps: StepperInfo[]
) => {
  // const activeStep = useMemo(
  //   () => totalSteps.findIndex((step) => step.index === currentStep.index),
  //   [currentStep, totalSteps]
  // )

  // const steps = useMemo(
  //   () =>
  //     totalSteps.map((step, index) => ({
  //       ...step,
  //       status:
  //         currentStep.index > index
  //           ? 'completed'
  //           : currentStep.index === index
  //             ? currentStep.status
  //             : 'pending',
  //     })),
  //   [currentStep, totalSteps]
  // )

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

  const activeStep = currentStep.index
  return { activeStep, steps }
}
