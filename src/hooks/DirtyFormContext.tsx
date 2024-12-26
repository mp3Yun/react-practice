import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface DirtyFormContextProps {
  isDirty: boolean
  setIsDirty: (isDirty: boolean) => void
}

const DirtyFormContext = createContext<DirtyFormContextProps | undefined>(
  undefined
)

export const DirtyFormProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <DirtyFormContext.Provider value={{ isDirty, setIsDirty }}>
      {children}
    </DirtyFormContext.Provider>
  )
}

export const useDirtyForm = () => {
  const context = useContext(DirtyFormContext)
  if (context === undefined) {
    throw new Error('useDirtyForm must be used within a DirtyFormProvider')
  }
  return context
}
