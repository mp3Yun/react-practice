import { Button, ButtonProps } from '@chakra-ui/react'
import { AllIcons, createIcon } from '../../utils/icons-utils'

interface Props extends ButtonProps {
  colorScheme?: string
  boxSize?: number
  icon: AllIcons
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CircleButton: React.FC<Props> = ({
  colorScheme,
  boxSize,
  onClick,
  icon,
  ...props
}) => {
  return (
    <Button
      alignItems={'center'}
      className="show-border"
      borderRadius={'50%'}
      width={'32px'}
      height={'32px'}
      padding="0"
      variant={'outline'}
      {...props}
      onClick={onClick}
    >
      {createIcon(icon, {
        color: colorScheme,
      })}
    </Button>
  )
}

export default CircleButton
