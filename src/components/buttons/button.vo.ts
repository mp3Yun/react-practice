import { FaIconProps } from '../icons/icon.vo'

export interface BaseButton {
  text?: string
  iconSrc?: any
  iconProps?: FaIconProps
  style?: {
    [key: string]: any
  }
  btnClassName?: string
}
