import { useBlocker } from '@tanstack/react-router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import LeaveWarningModal from '../components/modals/LeaveWarningModal'

interface FormGuardContextProps {
  isDirty: boolean
  setIsDirty: (isDirty: boolean) => void
}

const FormGuardContext = createContext<FormGuardContextProps | undefined>(
  undefined
)

export const FormGuardProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isDirty, setIsDirty] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const { proceed, status } = useBlocker({
    shouldBlockFn: ({ next }) => {
      if (isDirty) {
        setModalOpen(true)
        return true
      }
      return false
    },
    withResolver: true,
  })

  const confirmLeave = () => {
    console.log('proceed', proceed)
    if (proceed === undefined) return
    proceed()
    setModalOpen(false)
    setIsDirty(false) // 還原狀態
  }

  const cancelLeave = () => {
    console.log('cancel')
    setModalOpen(false)
    setIsDirty(false) // 還原狀態
  }

  return (
    <FormGuardContext.Provider value={{ isDirty, setIsDirty }}>
      {children}
      {status === 'blocked' && (
        <LeaveWarningModal
          isOpen={isModalOpen}
          onCheck={confirmLeave}
          onClose={cancelLeave}
        />
      )}
    </FormGuardContext.Provider>
  )
}

export const useFormLeaveGuard = () => {
  const context = useContext(FormGuardContext)
  if (context === undefined) {
    throw new Error('useFormGuard must be used within a FormGuardProvider')
  }
  return context
}
