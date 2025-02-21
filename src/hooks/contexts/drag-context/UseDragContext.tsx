import { createContext, useContext, useState } from 'react'

interface DragContextType {
  cancelDrag: boolean
  setCancelDrag: (cancelDrag: boolean) => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const [cancelDrag, setCancelDrag] = useState(false)

  return (
    <DragContext.Provider value={{ cancelDrag, setCancelDrag }}>
      {children}
    </DragContext.Provider>
  )
}

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext)

  if (!context) {
    throw new Error('useDragContext must be used within a DragProvider')
  }
  return context
}
