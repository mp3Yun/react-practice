import { GrAdd } from 'react-icons/gr'
import { FaMinus, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { CiCircleInfo } from 'react-icons/ci'
import { FaCheck } from 'react-icons/fa'
import React from 'react'
import ReactIcon from '../assets/react.svg'

export enum ChakraIcons {
  Add = 'Add',
  Delete = 'Delete',
  Edit = 'Edit',
  Info = 'Info',
  Check = 'Check',
  MinusIcon = 'MinusIcon',
}

export enum SvgIcons {
  React = 'React',
}

export type AllIcons = ChakraIcons | SvgIcons
// 定義 iconMap
const iconMap: Record<AllIcons, React.ElementType | string> = {
  [ChakraIcons.Add]: GrAdd,
  [ChakraIcons.MinusIcon]: FaMinus,
  [ChakraIcons.Delete]: MdDelete,
  [ChakraIcons.Edit]: FaEdit,
  [ChakraIcons.Info]: CiCircleInfo,
  [ChakraIcons.Check]: FaCheck,
  [SvgIcons.React]: ReactIcon,
}

// 定義 IconTypes
export type IconTypes = keyof typeof iconMap
export function createIcon<T extends IconTypes>(
  iconType: T,
  props?: React.ComponentProps<typeof GrAdd> & {
    // 繼承 Chakra Icon 的屬性
    imgProps?: React.ComponentProps<'img'>
  }
): React.ReactElement | null {
  const SelectedIcon = iconMap[iconType]

  if (!SelectedIcon) {
    console.error(`Unknown icon type: ${iconType}`)
    return null
  }

  // 如果是 Chakra Icon，直接渲染
  if (typeof SelectedIcon !== 'string') {
    // 使用 React.createElement 動態生成元件
    return React.createElement(SelectedIcon, props)
  }

  // 如果是 SVG 路徑，渲染 img 元素
  const { imgProps, ...restProps } = props || {} // 解構 imgProps 和其他屬性

  return React.createElement('img', {
    src: SelectedIcon,
    alt: iconType, // 為了可訪問性設置 alt 屬性
    ...imgProps, // 擴展 imgProps
    ...restProps, // 擴展其他 props
  })
}
