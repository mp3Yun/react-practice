import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import { generateRandomPairs } from '../../../utils/array-utils'
import { useState } from 'react'
import MemoryCard from '../../../components/MemoryCard'
import { PngImgs } from '../../../utils/icons-utils'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'

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
const MemoryCardPage: React.FC = () => {
  // ==== 狀態管理區 ==== //
  const [cardSize, setCardSize] = useState<number>(2)
  // 卡片的呈現
  const [cardList, setCardList] = useState<CardInfo[]>([])
  // 記錄前一個被點擊的值，跟後一個被點擊的值
  const [pairValue, setPairValue] = useState<StepRecord[]>([])
  // 是否已找到配對者，是則存放配對成功的值
  const [isPaired, setIsPaired] = useState<number[]>([])
  // 完成 popup 確認窗的控制
  const { open, onOpen, onClose } = useDisclosure()

  const initCardList = (cardSize: number): CardInfo[] => {
    const randomPairs = generateRandomPairs(cardSize)
    const myCards = randomPairs.map((item) => {
      return {
        value: item.toString(),
        isFlipped: false,
      }
    })
    return myCards
  }

  // 初始化
  if (cardList.length === 0) {
    console.log('99-我初始化 call 了幾次>??')
    setCardList(initCardList(cardSize))
  }

  const handleReset = () => {
    const newCardList = initCardList(cardSize)
    setCardList(newCardList)
    // 清空配對紀錄
    setPairValue([])
    // 清空已配對紀錄
    setIsPaired([])
  }

  const handleCardClick = (value: string, index: number) => {
    // 檢查該卡片是否已被配對，是則不做任何處理
    if (isPaired.includes(+value)) return

    // 變更卡片組
    setCardList((prev) =>
      prev.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    )

    // 設定點擊的卡片值
    if (pairValue.length < 2) {
      setPairValue((prev) => {
        const newValue = [...prev, { value, index }]
        if (newValue.length === 2) {
          // 比較兩組的值是否相等
          if (newValue[0].value === newValue[1].value) {
            // 紀錄完成的卡片
            setIsPaired((prev) => {
              // 如果新值已存在於配對的值中，直接返回原本陣列
              if (prev.includes(Number(newValue[0].value))) {
                return prev
              }
              const newPaired = [...prev, Number(newValue[0].value)]

              if (newPaired.length === cardSize) {
                onOpen()
              }
              return newPaired
            })
          } else {
            // 將兩張卡片翻回去
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
          // 清空值
          setPairValue([])
        }
        return newValue
      })
    }
  }

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Box margin="1rem">
        <Text fontSize="2xl"> Memory Card </Text>
      </Box>
      <Grid templateRows="repeat(2, 1fr)">
        <GridItem>
          {/* <Input
            value={cardSize.toString()}
            placeholder="請輸入卡片數量"
            onChange={(event) => {
              if (event.target.value === '') return
              setCardSize(Number(event.target.value))
              const newCardList = initCardList(Number(event.target.value))
              setCardList(newCardList)
            }}
          /> */}
        </GridItem>
      </Grid>
      <Box margin="4rem" className="show-border">
        <Grid templateColumns="repeat(4, 1fr)" gap="2rem">
          {cardList.map((item, index) => {
            return (
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
                ></MemoryCard>
              </GridItem>
            )
          })}
        </Grid>
      </Box>
      <Box m="2rem">
        <Button onClick={handleReset}>Start a new round</Button>
      </Box>
      {/* 如果都完成了的話，跳 popup 恭喜你完成挑戰 */}
      <ConfirmDialog
        isOpen={open}
        onConfirm={() => {
          handleReset()
          onClose()
        }}
        onClose={() => {
          onClose()
        }}
        confirmTitle={'新局'}
        confirmMessage={'恭喜你完成挑戰，請問是否再開新局?'}
      ></ConfirmDialog>
    </Box>
  )
}

export default MemoryCardPage
