import React from 'react'
import { useParagraphStyle } from '../hooks/useParagraphStyle'

interface NestedComponentProps {
  level?: number // 當前層級
  children: React.ReactNode
  title?: string
  className?: string
}

const NestedComponent = ({
  level,
  children,
  title,
  className,
}: NestedComponentProps) => {
  const nodesLevel = React.Children.toArray(children).map((child) => {
    React.isValidElement(child) && child.type === 'div'
  })
  level = level || nodesLevel.length
  const { style, getFontSizeByLevel } = useParagraphStyle()
  const fontSize = getFontSizeByLevel(level)

  return (
    <div className={className}>
      <p style={{ ...style, fontSize }}>{title}</p>
      {children}
    </div>
  )
}

export default NestedComponent
