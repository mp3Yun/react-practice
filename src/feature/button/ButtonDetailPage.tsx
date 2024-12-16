import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import NestedComponent from '../../components/NestedComponent'
import { ChakraIcons } from '../../utils/icons-utils'
import CircleButton from '../../components/buttons/CircleButton'
import React from 'react'

const ButtonDetailPage: React.FC = () => {
  const buttonList = [
    { bgColor: 'primary.500', title: 'primary.500' },
    { bgColor: 'primary.400', title: 'primary.400' },
    { bgColor: 'primary.300', title: 'primary.300' },
    { bgColor: 'primary.200', title: 'primary.200' },
    { bgColor: 'primary.100', title: 'primary.100' },
    { bgColor: 'secondary.500', title: 'secondary.500' },
    { bgColor: 'secondary.400', title: 'secondary.400' },
    { bgColor: 'secondary.300', title: 'secondary.300' },
    { bgColor: 'secondary.200', title: 'secondary.200' },
    { bgColor: 'secondary.100', title: 'secondary.100' },
  ]

  const circleButtonList = [
    {
      id: 1,
      bgColor: 'primary.500',
      title: 'primary.500',
      icon: ChakraIcons.Add,
    },
    { id: 2, bgColor: 'red.500', title: 'red.500', icon: ChakraIcons.Delete },
    {
      id: 3,
      bgColor: 'oceanGreenBlue.500',
      title: 'oceanGreenBlue.500',
      icon: ChakraIcons.Info,
    },
    {
      id: 4,
      bgColor: 'secondary.500',
      title: 'secondary.500',
      icon: ChakraIcons.Edit,
    },
  ]
  return (
    <NestedComponent>
      <div> 按鈕顏色 </div>

      <Flex direction={'row'} wrap="wrap" gap={2} my={4}>
        {buttonList.map((item, index) => (
          <React.Fragment key={index}>
            <Box flex="1 1 80px">
              <>
                <div> {item.title} </div>
                <Button bg={item.bgColor} size={'sm'}>
                  Button
                </Button>
              </>
            </Box>
            {index === 4 && <Box flexBasis="100%" />}
          </React.Fragment>
        ))}
      </Flex>

      <div> 圓形按鈕 </div>
      <Flex my={4} direction={'row'} gap={2} alignItems={'center'}>
        {circleButtonList.map((item, index) => (
          <Box flex="1 1 80px" key={index}>
            <div>
              {item.title} <br></br>
              <CircleButton
                mt={4}
                key={item.id}
                colorScheme={item.bgColor}
                size="sm"
                icon={item.icon}
              ></CircleButton>
            </div>
          </Box>
        ))}
      </Flex>
    </NestedComponent>
  )
}

export default ButtonDetailPage
