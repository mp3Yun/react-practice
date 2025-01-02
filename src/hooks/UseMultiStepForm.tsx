import { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { validateForm } from '../utils/form-utils'

interface MultiStepFormProps<TFieldValues extends readonly FieldValues[]> {
  currentStep: number
  formMethods: UseFormReturn<TFieldValues[number]>
  stepData: Partial<TFieldValues[number]>[]
  setStepData: (step: number, data: Partial<TFieldValues[number]>) => void
  nextStep: () => void
  prevStep: () => void
  resetStep: (step: number) => void
  resetAll: () => void
}

export interface StepProps<TFieldValues extends FieldValues> {
  defaultValues: TFieldValues
}
export function useMultiStepForm<TFieldValues extends readonly FieldValues[]>(
  steps: StepProps<TFieldValues[number]>[]
): MultiStepFormProps<TFieldValues> {
  const [currentStep, setCurrentStep] = useState(0)
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

  const handleStepValidation = async () => {
    return validateForm(formMethods)
  }

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      // 加入檢查驗證
      const checkValidation = await handleStepValidation()
      if (!checkValidation) return
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => prev + 1)
      const tmpStepData =
        stepData[currentStep + 1] || steps[currentStep + 1].defaultValues
      formMethods.reset(tmpStepData as TFieldValues)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setStepData(currentStep, formMethods.getValues())
      setCurrentStep((prev) => prev - 1)
      const tmpStepData =
        stepData[currentStep - 1] || steps[currentStep - 1].defaultValues
      formMethods.reset(tmpStepData as TFieldValues)
    }
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
    setCurrentStep(0)
  }

  return {
    currentStep,
    formMethods,
    stepData,
    setStepData,
    nextStep,
    prevStep,
    resetStep,
    resetAll,
  }
}
