import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'
import FormInput from '../../../components/formInput/FormInput'
import MemoryCard from '../../../components/MemoryCard'
import { FormLayoutContextProvider } from '../../../hooks/FormLayoutContext'
import { generateRandomPairs } from '../../../utils/array-utils'
import { PngImgs } from '../../../utils/icons-utils'

interface StepRecord {
  // 第幾張卡被翻動
  index: number
  // 該卡片的值
  value: string
}

interface CardInfo {
  value: string
  isFlipped: boolean
}

type FormContext = {
  cardSize: number
}

const MemoryCardPage: React.FC = () => {
  const initCardList = (cardSize: number): CardInfo[] => {
    const randomPairs = generateRandomPairs(cardSize)
    return randomPairs.map((item) => ({
      value: item.toString(),
      isFlipped: false,
    }))
  }

  // 將翻轉卡片的邏輯抽出來
  const flipCard = (index: number) => {
    setCardList((prev) =>
      prev.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    )
  }

  // 處理配對邏輯
  const handlePairing = (newValue: StepRecord[]) => {
    if (newValue[0].value === newValue[1].value) {
      handleMatchedPair(newValue)
    } else {
      handleUnmatchedPair(newValue)
    }
  }

  const handleMatchedPair = (newValue: StepRecord[]) => {
    setIsPaired((prev) => {
      // 如果新值已存在於配對的值中，直接返回原本陣列
      if (prev.includes(Number(newValue[0].value))) {
        return prev
      }
      const newPaired = [...prev, Number(newValue[0].value)]
      if (newPaired.length === cardSize) onOpen()
      return newPaired
    })
  }

  const handleUnmatchedPair = (newValue: StepRecord[]) => {
    setTimeout(() => {
      setCardList((prev) =>
        prev.map((card, idx) =>
          idx === newValue[0].index || idx === newValue[1].index
            ? { ...card, isFlipped: false }
            : card
        )
      )
    }, 1000)
  }

  // 表單控制
  const formMethods = useForm<FormContext>({
    defaultValues: {
      cardSize: 4,
    },
  })
  const cardSize = formMethods.getValues().cardSize

  // 狀態管理
  const [cardList, setCardList] = useState<CardInfo[]>(initCardList(cardSize))
  const [pairValue, setPairValue] = useState<StepRecord[]>([])
  const [isPaired, setIsPaired] = useState<number[]>([])
  const { open, onOpen, onClose } = useDisclosure()

  const handleReset = () => {
    const newCardList = initCardList(formMethods.getValues().cardSize)
    setCardList(newCardList)
    setPairValue([])
    setIsPaired([])
  }

  const handleCardClick = (value: string, index: number) => {
    if (isPaired.includes(+value)) return

    flipCard(index)

    if (pairValue.length < 2) {
      setPairValue((prev) => {
        const newValue = [...prev, { value, index }]
        if (newValue.length === 2) {
          handlePairing(newValue)
          setPairValue([])
        }
        return newValue
      })
    }
  }

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Box margin="1rem">
        <Text fontSize="2xl">Memory Card</Text>
      </Box>
      <Box>
        <FormLayoutContextProvider initialFlexDir="row">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(() => handleReset())}
              style={{ display: 'flex', gap: '8px' }}
            >
              <Box>
                <FormInput
                  label="卡片數量"
                  control={formMethods.control}
                  name="cardSize"
                />
              </Box>

              <Button alignSelf="center" type="submit">
                Confirm
              </Button>
            </form>
          </FormProvider>
        </FormLayoutContextProvider>
      </Box>

      <Box margin="4rem" className="show-border">
        <Grid templateColumns="repeat(4, 1fr)" gap="2rem">
          {cardList.map((item, index) => (
            <GridItem key={index}>
              <MemoryCard
                pngImg={
                  PngImgs[
                    `Animal${+item.value + 1}` as keyof typeof PngImgs
                  ] as PngImgs
                }
                index={index}
                value={item.value.toString()}
                onClick={handleCardClick}
                isFlipped={item.isFlipped}
                hasPair={isPaired.includes(+item.value)}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Box m="2rem">
        <Button onClick={handleReset}>Start a new round</Button>
      </Box>

      <ConfirmDialog
        isOpen={open}
        onConfirm={() => {
          handleReset()
          onClose()
        }}
        onClose={() => onClose()}
        confirmTitle={'新局'}
        confirmMessage={'恭喜你完成挑戰，請問是否再開新局?'}
      />
    </Box>
  )
}

export default MemoryCardPage
