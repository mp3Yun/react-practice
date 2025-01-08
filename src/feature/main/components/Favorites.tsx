import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import SquareButton from '../../../components/buttons/SquareButton'
import Card from '../../../components/Card'
import DragBlock from '../../../components/dragDrop/DragBlock'
import { ChakraIcons, createIcon } from '../../../utils/icons-utils'

interface FavoritesItem {
  id: number
  text: string
  path: string
}

const CustomButton = <T extends { id: number; text: string }>({
  item,
}: {
  item: T
}) => (
  <SquareButton
    text={item.text}
    m={1}
    _hover={{ bg: 'primary.300' }}
    _active={{ bg: 'primary.500', transform: 'scale(0.95)' }}
  ></SquareButton>
)
const Favorites: React.FC = () => {
  const favoritesList: FavoritesItem[] = [
    { id: 1, text: 'A', path: '/' },
    { id: 2, text: 'B', path: '/' },
    { id: 3, text: 'C', path: '/' },
    { id: 4, text: 'D', path: '/' },
    { id: 5, text: 'E', path: '/' },
    { id: 6, text: 'F', path: '/' },
    { id: 7, text: 'G', path: '/' },
    { id: 8, text: 'H', path: '/' },
    { id: 9, text: 'I', path: '/' },
    { id: 10, text: 'J', path: '/' },
    { id: 11, text: 'K', path: '/' },
    { id: 12, text: 'L', path: '/' },
    { id: 13, text: 'M', path: '/' },
    { id: 14, text: 'N', path: '/' },
    { id: 15, text: 'O', path: '/' },
    { id: 16, text: 'P', path: '/' },
    { id: 17, text: 'Q', path: '/' },
    { id: 18, text: 'R', path: '/' },
    { id: 19, text: 'S', path: '/' },
    { id: 20, text: 'T', path: '/' },
    { id: 21, text: 'U', path: '/' },
    { id: 22, text: 'V', path: '/' },
    { id: 23, text: 'W', path: '/' },
    { id: 24, text: 'X', path: '/' },
    { id: 25, text: 'Y', path: '/' },
    { id: 26, text: 'Z', path: '/' },
  ]
  const [isEditing, setIsEditing] = useState(false)
  const [items, setItems] = useState(favoritesList)

  const handleDragEnd = (items: FavoritesItem[]) => {
    setItems([...items])
  }

  return (
    <Flex>
      <Card bgColor={'gray.100'}>
        <Box textAlign={'right'}>
          <button
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            {createIcon(!isEditing ? ChakraIcons.Edit : ChakraIcons.Check, {
              color: 'oceanGreenBlue.500',
            })}
          </button>
        </Box>
        {!isEditing ? (
          <>
            <Box>
              {items.map((item) => (
                <SquareButton
                  key={item.id}
                  text={item.text}
                  m={2}
                  bg={'secondary.300'}
                ></SquareButton>
              ))}
            </Box>
          </>
        ) : (
          <DragBlock
            data={items}
            onDragEndEvent={handleDragEnd}
            CustomComponent={CustomButton}
          ></DragBlock>
        )}
      </Card>
    </Flex>
  )
}

export default Favorites
