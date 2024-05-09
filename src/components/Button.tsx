import { FC, PropsWithChildren, ReactNode } from 'react'
import FaIcon from './icons/FaIcon'
import { FaIconProps } from './icons/icon.vo'

export interface ButtonProps {
  style?: React.CSSProperties
  prefixIcon?: FaIconProps
  suffixIcon?: FaIconProps
  className?: string
  onClick?: (props: any) => void
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
  style,
  prefixIcon,
  suffixIcon,
  className,
  onClick,
  children,
}) => {
  return (
    <button style={style} className={className} onClick={onClick}>
      {prefixIcon && <FaIcon {...prefixIcon}></FaIcon>}
      {children}
      {suffixIcon && <FaIcon {...prefixIcon}></FaIcon>}
    </button>
  )
}

export default Button

export interface CardButtonProps extends ButtonProps {
  size: 'xs' | 'sm' | 'md' | 'lg'
}

const CardIconButton: FC<CardButtonProps> = ({
  size,
  style,
  prefixIcon,
  suffixIcon,
  className,
  onClick,
  children,
}) => {
  let cardClassName = className

  if (size) {
    cardClassName = 'font-medium '
    switch (size) {
      case 'xs':
        cardClassName = cardClassName + 'w-20 h-20 rounded-sm '
        break
      case 'sm':
        cardClassName = cardClassName + 'w-30 h-30 rounded '
        break
      case 'md':
        cardClassName = cardClassName + 'w-40 h-40 rounded-md '
        break
      case 'lg':
        cardClassName = cardClassName + 'w-50 h-50 rounded-lg '
        break
    }
  }

  return (
    <div className="border-solid border-3 border-cyan-700 w-auto h-auto flex">
      <Button
        style={style}
        className={cardClassName}
        prefixIcon={prefixIcon}
        suffixIcon={suffixIcon}
        onClick={onClick}
      >
        <br></br>
        {children}
      </Button>
    </div>
  )
}

export { Button, CardIconButton }
