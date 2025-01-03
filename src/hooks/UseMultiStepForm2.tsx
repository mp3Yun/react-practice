import { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { StepperInfo } from '../components/steppers/Stepper'

interface MultiStepFormProps<TFieldValues extends readonly FieldValues[]> {
  currentStep: number
  formMethods: UseFormReturn<TFieldValues[number]>
  stepData: Partial<TFieldValues[number]>[]
  setStepData: (step: number, data: Partial<TFieldValues[number]>) => void
  resetStep: (step: number) => void
  resetAll: () => void
}

export interface StepProps<TFieldValues extends FieldValues> {
  stepInfo: StepperInfo
  defaultValues: TFieldValues
}
export function useMultiStepForm2<TFieldValues extends readonly FieldValues[]>(
  steps: StepProps<TFieldValues[number]>[],
  currentStep: number,
  onStepChange: (step: StepperInfo) => void
): MultiStepFormProps<TFieldValues> {
  const [stepData, setStepDataState] = useState<
    Partial<TFieldValues[number]>[]
  >(steps.map((step) => step.defaultValues))

  const currentStepData =
    stepData[currentStep] || steps[currentStep].defaultValues
  const formMethods = useForm<TFieldValues[number]>(currentStepData)

  const setStepData = (step: number, data: Partial<TFieldValues[number]>) => {
    setStepDataState((prev) => {
      const newData = [...prev]
      newData[step] = data
      return newData
    })
  }

  const resetStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      formMethods.reset(steps[step].defaultValues)
      setStepData(step, steps[step].defaultValues)
    }
  }

  const resetAll = () => {
    setStepDataState(steps.map((step) => step.defaultValues))
    formMethods.reset(steps[0].defaultValues)
    onStepChange(steps[0].stepInfo)
  }

  return {
    currentStep,
    formMethods,
    stepData,
    setStepData,
    resetStep,
    resetAll,
  }
}
