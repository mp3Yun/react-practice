import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface FormLayoutContextProps {
  flexDir: string
  setFlexDir: (dir: string) => void
}

const FormLayoutContext = createContext<FormLayoutContextProps | undefined>(
  undefined
)

export const FormLayoutContextProvider: React.FC<
  PropsWithChildren<{ initialFlexDir?: string }>
> = ({ children, initialFlexDir = 'column' }) => {
  const [flexDir, setFlexDir] = useState<string>(initialFlexDir)
  return (
    <FormLayoutContext.Provider value={{ flexDir, setFlexDir }}>
      {children}
    </FormLayoutContext.Provider>
  )
}

export const useFormLayoutContext = () => {
  const context = useContext(FormLayoutContext)
  if (context === undefined) {
    // 回傳預設值
    return {
      flexDir: 'column',
      setFlexDir: () => {
        console.warn('setFlexDir 被呼叫，但 Provider 尚未定義')
      },
    }
  }
  return context
}
