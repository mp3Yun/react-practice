import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'
import React from 'react'

export enum ChakraIcons {
  Add = 'Add',
  Delete = 'Delete',
  Edit = 'Edit',
  Info = 'Info',
}

// 定義 iconMap
const iconMap: Record<ChakraIcons, React.ElementType> = {
  [ChakraIcons.Add]: AddIcon,
  [ChakraIcons.Delete]: DeleteIcon,
  [ChakraIcons.Edit]: EditIcon,
  [ChakraIcons.Info]: InfoIcon,
}

// 定義 IconTypes
export type IconTypes = keyof typeof iconMap
export function createChakraIcon<T extends IconTypes>(
  type: T,
  props?: React.ComponentProps<typeof AddIcon> // 繼承 Chakra Icon 的屬性
): React.ReactElement | null {
  const SelectedIcon = iconMap[type]

  if (!SelectedIcon) {
    console.error(`Unknown icon type: ${type}`)
    return null
  }

  // 使用 React.createElement 動態生成元件
  return React.createElement(SelectedIcon, props)
}
