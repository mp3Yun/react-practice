import { useState } from 'react'
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from 'react-hook-form'

interface MultiStepFormProps<TFieldValues extends readonly FieldValues[]> {
  currentStep: number
  formMethods: UseFormReturn<TFieldValues[number]>
  stepData: Partial<TFieldValues[number]>[]
  setStepData: (step: number, data: Partial<TFieldValues[number]>) => void
  resetStep: (step: number) => void
  resetAll: () => void
}

export interface StepProps<TFieldValues extends FieldValues> {
  defaultValues: TFieldValues
}
export function useMultiStepForm2<TFieldValues extends readonly FieldValues[]>(
  steps: StepProps<TFieldValues[number]>[],
  currentStep: number,
  onStepChange: (step: number) => void
): MultiStepFormProps<TFieldValues> {
  const [stepData, setStepDataState] = useState<
    Partial<TFieldValues[number]>[]
  >(steps.map((step) => step.defaultValues))

  // 為每個步驟創建獨立的 formMethods
  const formMethods = steps.map((step, index) =>
    useForm<TFieldValues[number]>({
      defaultValues: (stepData[index] || step.defaultValues) as DefaultValues<
        TFieldValues[number]
      >,
    })
  )
  console.error('formMethods', formMethods)

  const setStepData = (step: number, data: Partial<TFieldValues[number]>) => {
    setStepDataState((prev) => {
      const newData = [...prev]
      newData[step] = data
      return newData
    })
  }

  const resetStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      formMethods[step].reset(steps[step].defaultValues)
      setStepData(step, steps[step].defaultValues)
    }
  }

  const resetAll = () => {
    setStepDataState(steps.map((step) => step.defaultValues))
    formMethods.forEach((form, index) => {
      form.reset(steps[index].defaultValues)
    })
    onStepChange(0)
  }

  return {
    currentStep,
    formMethods: formMethods[currentStep],
    stepData,
    setStepData,
    resetStep,
    resetAll,
  }
}
