import { FaIconProps } from '../icons/icon.vo'

export interface BaseButton {
  id?: number
  type?: 'IconBtn' | 'IconTextBtn' | 'TextBtn' | 'TextIconBtn'
  text?: string
  iconSrc?: any
  iconProps?: FaIconProps
  style?: {
    [key: string]: any
  }
  btnClassName?: string
}

export interface ListBaseButton extends BaseButton {
  subBtns: BaseButton[]
}
