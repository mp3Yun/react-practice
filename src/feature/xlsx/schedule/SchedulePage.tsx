import { Box } from '@chakra-ui/react'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { ItemInfo } from '../../../components/dragDrop/CrossZoneDragger'
import { ColumnType } from '../../../helper/report-parser-content/report.type'
import { useStore } from '../../../hooks/contexts/store-context/UseStore'
import { fakeTours } from '../data/fakeTours'
import ConfirmedSchedules from './components/ConfirmedSchedules'
import PendingHotels from './components/PendingHotels'
import PendingTours from './components/PendingTours'

// 定義 Enum
enum DataKey {
  tours = 'tours',
  hotels = 'hotels',
  schedules = 'schedules',
}

interface SortOutData {
  [DataKey.tours]: ItemInfo[]
  [DataKey.hotels]: ItemInfo[]
  [DataKey.schedules]: Record<string, ItemInfo[]>
}

export const TripCard = <T extends ItemInfo>({ item }: { item: T }) => (
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

const parseDataToPendingItem = <T extends { id: ColumnType; name: ColumnType }>(
  dataKey: DataKey,
  data: T[]
): ItemInfo[] => {
  return data.map((item) => ({
    id: `${dataKey}${item.id.value}`,
    origId: +item.id.value,
    text: item.name.value,
  }))
}

const SchedulePage: React.FC = () => {
  const { storeData } = useStore()
  // ===== 實際資料 [ start TODO:] ===== //
  // const tours = storeData?.xlsx?.tours
  // const hotels = storeData?.xlsx?.hotels
  // ===== 實際資料 [ end] ===== //

  const tours = fakeTours // TODO: 先用假資料
  // 待安排的景點 =>這邊可能要變成去聽 tours
  const pendingTours: ItemInfo[] = !tours
    ? []
    : parseDataToPendingItem(DataKey.tours, tours)
  // 待安排的旅館
  const pendingHotels: ItemInfo[] = [
    { id: '4', text: '住宿 1', origId: 0 },
    { id: '5', text: '住宿 2', origId: 1 },
    { id: '6', text: '住宿 3', origId: 2 },
  ] // TODO: 根據 hotels 再做整理
  // 最後確認的行程
  const confirmedSchedules: ItemInfo[] = []

  // 管理排序的資料(含待安排、已安排)
  const [data, setData] = useState<SortOutData>({
    [DataKey.tours]: pendingTours,
    [DataKey.hotels]: pendingHotels,
    [DataKey.schedules]: {
      Day1: confirmedSchedules,
    },
  })

  // 處理跨區拖拉
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    console.log('active.id', active.id)
    console.log('over.id', over?.id)
    if (!over) return

    let sourceKey: string | null = null
    let targetKey: string | null = null

    // 來源目標:
    Object.values([DataKey.tours, DataKey.hotels]).forEach((key) => {
      const sourceData = data[key] as ItemInfo[]
      if (
        sourceData &&
        sourceData.some((item: ItemInfo) => item.id === active.id)
      ) {
        sourceKey = key
      }
    })

    // 可能目標區塊: DataKey.schedules
    const scheduleDataObj = data[DataKey.schedules] as Record<
      string,
      ItemInfo[]
    >
    Object.keys(scheduleDataObj).forEach((key) => {
      const targeData = scheduleDataObj[key] as ItemInfo[]
      if (
        targeData.some((item) => item.id === over.id) ||
        targeData.length === 0
      ) {
        targetKey = key
      }
    })

    console.error('99-sourceKey=>', sourceKey)
    console.error('99-targetKey=>', targetKey)

    if (!sourceKey) return
    if (!targetKey) targetKey = DataKey.schedules // 預設目標區

    // 如果來源和目標相同，不做任何處理
    // TODO: 同一天的日程可以互調(晚一點再處理)
    if (sourceKey === targetKey) return

    // 所有可移動項目
    const flatSchedulesData = { ...data[DataKey.schedules] }
    const { [DataKey.schedules]: _, ...filteredData } = data
    const allMoveableItems = {
      ...filteredData,
      ...flatSchedulesData,
    } as Record<string, ItemInfo[]>
    // 移動項目
    const movedItem = allMoveableItems[sourceKey].find(
      (item) => item.id === active.id
    )
    if (!movedItem) return

    const newSourceList = allMoveableItems[sourceKey].filter(
      (item) => item.id !== active.id
    )

    const tmpTargetItem = !allMoveableItems[targetKey]
      ? []
      : allMoveableItems[targetKey]
    const newTargetList = [...tmpTargetItem, movedItem]

    console.error('99----------- 整理 [start] ---------------')
    console.log('targetKey', targetKey)
    console.log('newTargetList', newTargetList)
    console.log('sourceKey', sourceKey)
    console.log('newSourceList', newSourceList)

    // 判斷 targetKey 是否為非 tours / hotels 的鍵，是的話，資料要安排在 schedules 下
    if (targetKey !== DataKey.tours && targetKey !== DataKey.hotels) {
      const moveResultObj = {
        ...data,
        [sourceKey]: [...newSourceList],
        [DataKey.schedules]: {
          [targetKey]: newTargetList,
        },
      }
      console.error('88----------- moveResultObj [check] ---------------')
      console.log('moveResultObj', data)
      setData(moveResultObj)
    } else {
      return data
    }

    console.error('99----------- 整理 [check] ---------------')
    console.log('data', data)
    console.error('99----------- 整理 [end] ---------------')
  }
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
        }}
      >
        {/* 景點 */}
        <PendingTours pendingTours={pendingTours}></PendingTours>
        {/* 住宿 */}
        <PendingHotels pendingHotels={pendingHotels}></PendingHotels>
        {/* 行程 */}
        <ConfirmedSchedules
          scheduleDays={data[DataKey.schedules]}
        ></ConfirmedSchedules>
      </Box>
    </DndContext>
  )
}

export default SchedulePage
