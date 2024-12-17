import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import SquareButton from '../../../components/buttons/SquareButton'
import Card from '../../../components/Card'
import { ChakraIcons, createIcon } from '../../../utils/icons-utils'

const DragBlock: React.FC = () => {
  return <></>
}
const Favorites: React.FC = () => {
  const favoritesList = [
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
              boxSize: 6,
              color: 'oceanGreenBlue.500',
            })}
          </button>
        </Box>
        {!isEditing ? (
          <>
            <Box>
              {favoritesList.map((item) => (
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
          <DragBlock></DragBlock>
        )}
      </Card>
    </Flex>
  )
}

export default Favorites
