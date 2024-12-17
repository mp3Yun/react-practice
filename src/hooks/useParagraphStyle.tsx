import { createContext, ReactNode, useContext, useState } from 'react'

// 定義 context 型別
interface ParagraphStyleContextType {
  style: React.CSSProperties
  updateStyle: (style: React.CSSProperties) => void
  getFontSizeByLevel: (level: number) => string // 根據層級取得字體大小
}

// 建立 context
const ParagraphStyleContext = createContext<
  ParagraphStyleContextType | undefined
>(undefined)

// 自定義 Hook
export const useParagraphStyle = () => {
  const context = useContext(ParagraphStyleContext)
  if (!context) {
    throw new Error(
      'useParagraphStyle must be used within a ParagraphStyleProvider'
    )
  }
  return context
}

// 建立 Provider
export const ParagraphStyleProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({})

  const updateStyle = (newStyle: React.CSSProperties) => {
    setStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
  }

  // 動態取得字體大小
  const getFontSizeByLevel = (level: number) => {
    const originalFontSize = 2.75 // 原始字體大小
    const fontSize = originalFontSize - 0.25 * (originalFontSize / level)
    return `${fontSize}rem`
  }

  return (
    <ParagraphStyleContext.Provider
      value={{ style, updateStyle, getFontSizeByLevel }}
    >
      {children}
    </ParagraphStyleContext.Provider>
  )
}
