import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'
import React from 'react'
import ReactIcon from '../assets/react.svg'

export enum ChakraIcons {
  Add = 'Add',
  Delete = 'Delete',
  Edit = 'Edit',
  Info = 'Info',
}

export enum SvgIcons {
  React = 'React',
}

export type AllIcons = ChakraIcons | SvgIcons
// 定義 iconMap
const iconMap: Record<AllIcons, React.ElementType | string> = {
  [ChakraIcons.Add]: AddIcon,
  [ChakraIcons.Delete]: DeleteIcon,
  [ChakraIcons.Edit]: EditIcon,
  [ChakraIcons.Info]: InfoIcon,
  [SvgIcons.React]: ReactIcon,
}

// 定義 IconTypes
export type IconTypes = keyof typeof iconMap
export function createIcon<T extends IconTypes>(
  type: T,
  props?: React.ComponentProps<typeof AddIcon> & {
    // 繼承 Chakra Icon 的屬性
    imgProps?: React.ComponentProps<'img'>
  }
): React.ReactElement | null {
  const SelectedIcon = iconMap[type]

  if (!SelectedIcon) {
    console.error(`Unknown icon type: ${type}`)
    return null
  }

  // 如果是 Chakra Icon，直接渲染
  if (typeof SelectedIcon !== 'string') {
    // 使用 React.createElement 動態生成元件
    return React.createElement(SelectedIcon, props)
  }

  // 如果是 SVG 路徑，渲染 img 元素
  const { imgProps, ...svgProps } = props || {}
  return React.createElement('img', { src: SelectedIcon, ...props })
}
