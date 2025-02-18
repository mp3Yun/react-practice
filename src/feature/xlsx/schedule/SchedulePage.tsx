import { Box } from '@chakra-ui/react'
import { DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import CrossZoneDragger, {
  ItemInfo,
} from '../../../components/dragDrop/CrossZoneDragger'

// const SchedulePage: React.FC = () => {
//   const { storeData } = useStore()
//   const tours = storeData?.xlsx?.tours
//   return (
//     <Box display="flex" flexDir="column">
//       <Box
//         className="show-border"
//         padding="5px"
//         display="flex"
//         flexDir="row"
//         borderRadius="2xl"
//       >
//         <Text
//           fontSize="2xl"
//           margin="1rem"
//           width="6vw"
//           borderRight="2px solid var(--chakra-colors-gray-300)"
//           textAlign="center"
//           justifySelf="center"
//         >
//           景點
//         </Text>
//         <Box
//           width="auto"
//           display="flex"
//           flexDir="row"
//           padding="0.5rem"
//           gap="0.5rem"
//         >
//           {tours?.map((tour) => (
//             <Box
//               key={tour.id.value}
//               width="auto"
//               textAlign="center"
//               padding="1rem"
//               className="show-border"
//               borderRadius="xl"
//               onClick={() => {}}
//             >
//               <Text fontSize="xl">{tour.name.value}</Text>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   )
// }

const TripCard = <T extends ItemInfo>({ item }: { item: T }) => (
  <Box
    className="show-border"
    padding="5px"
    display="flex"
    flexDir="column"
    borderRadius="2xl"
  >
    {item.text}
  </Box>
)

const SchedulePage: React.FC = () => {
  const [data, setData] = useState<Record<string, ItemInfo[]>>({
    spots: [
      { id: 1, text: '景點 1', origId: 0 },
      { id: 2, text: '景點 2', origId: 1 },
      { id: 3, text: '景點 3', origId: 2 },
    ],
    hotels: [
      { id: 4, text: '住宿 1', origId: 0 },
      { id: 5, text: '住宿 2', origId: 1 },
      { id: 6, text: '住宿 3', origId: 2 },
    ],
    // 初始為空
    schedules: [],
  })

  // 處理跨區拖拉
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    console.log('active', active)
    console.log('over', over)
    if (!over) return

    let sourceKey: string | null = null
    let targetKey: string | null = null

    // 找到來源 & 目標區塊
    Object.keys(data).forEach((key) => {
      console.error('99-key', key)
      if (key === 'schedules' && data[key].length === 0) {
        targetKey = 'schedules'
        console.error('99-targetKey', targetKey)
      }
      if (data[key].some((item) => item.id === active.id)) {
        sourceKey = key
      }

      // TODO: 這邊的邏輯要調整RRRRRRRR
      // if (
      //   data[key].some((item) => item.id === over.id) ||
      //   (key === 'schedule' && data[key].length === 0)
      // ) {
      //   targetKey = key
      //   console.error('99-targetKey', targetKey)
      // }
    })

    console.error('99-sourceKey=>', sourceKey)
    console.error('99-targetKey=>', targetKey)

    if (!sourceKey) return
    if (!targetKey) targetKey = 'schedule' // 預設目標區

    // 如果來源和目標相同，不做任何處理
    if (sourceKey === targetKey) return

    // 移動項目
    const movedItem = data[sourceKey].find((item) => item.id === active.id)
    if (!movedItem) return

    const newSourceList = data[sourceKey].filter(
      (item) => item.id !== active.id
    )

    console.error('99-133 data[targetKey] =>', data[targetKey])
    const tmpTargetItem = !data[targetKey] ? [] : data[targetKey]
    const newTargetList = [...tmpTargetItem, movedItem]

    console.error('99----------- 整理 [start] ---------------')
    console.log('targetKey', targetKey)
    console.log('newTargetList', newTargetList)
    console.log('sourceKey', sourceKey)
    console.log('newSourceList', newSourceList)
    console.error('99----------- 整理 [check] ---------------')
    console.log('data', data)
    console.error('99----------- 整理 [end] ---------------')

    // setData({
    //   ...data,
    //   [sourceKey]: newSourceList,
    //   [targetKey]: newTargetList,
    // })

    setData((prevData) => {
      console.log('[setData] targetKey', targetKey)
      console.log('[setData] sourceKey', sourceKey)
      if (!sourceKey || !targetKey) return prevData
      const result = {
        ...prevData,
        [sourceKey]: newSourceList,
        [targetKey]: newTargetList,
      }
      console.log('[setData] result', result)
      return result
    })
  }
  return (
    <CrossZoneDragger
      data={data}
      onDragEnd={handleDragEnd}
      CustomComponent={TripCard}
    ></CrossZoneDragger>
  )
}

export default SchedulePage
