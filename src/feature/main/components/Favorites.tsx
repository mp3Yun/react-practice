import { Box, Flex } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import React, { useState } from 'react'
import SquareButton from '../../../components/buttons/SquareButton'
import Card from '../../../components/Card'
import { ChakraIcons, createIcon } from '../../../utils/icons-utils'
import { CSS } from '@dnd-kit/utilities'

interface FavoritesItem {
  id: number
  text: string
  path: string
}
interface DraggableProps {
  data: FavoritesItem[]
}
const DragBlock: React.FC<DraggableProps> = ({ data }) => {
  const [items, setItems] = useState(data)

  // 設置感應器 (鼠標拖動 + 鍵盤支持)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {items.map((item, index) => (
              <SortableItem key={index} item={item} />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </>
  )
}

const SortableItem: React.FC<{ item: FavoritesItem }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
    cursor: 'grab',
  }

  return (
    <Box ref={setNodeRef} {...attributes} {...listeners}>
      <SquareButton text={item.text} m={1}></SquareButton>
    </Box>
  )
}

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
          <DragBlock data={favoritesList}></DragBlock>
        )}
      </Card>
    </Flex>
  )
}

export default Favorites
