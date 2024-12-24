import React from 'react'
import { useParagraphStyle } from '../hooks/useParagraphStyle'
import { Box, Flex } from '@chakra-ui/react'
import { ChakraIcons, createIcon } from '../utils/icons-utils'

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

  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className={className}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <p style={{ ...style, fontSize }}>{title}</p>
        </Box>
        <Box alignContent="center" fontSize={'md'}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {createIcon(isExpanded ? ChakraIcons.MinusIcon : ChakraIcons.Add, {
              boxSize: 6,
            })}
          </button>
        </Box>
      </Flex>

      {isExpanded && children}
    </div>
  )
}

export default NestedComponent
