import { Box } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
  useDraggable,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { ItemInfo } from '../../../components/dragDrop/CrossZoneDragger'
import { ColumnType } from '../../../helper/report-parser-content/report.type'
import { useStore } from '../../../hooks/contexts/store-context/UseStore'
import { fakeTours } from '../data/fakeTours'
import ConfirmedSchedules from './components/ConfirmedSchedules'
import PendingHotels from './components/PendingHotels'
import PendingTours from './components/PendingTours'
import { useDragContext } from '../../../hooks/contexts/drag-context/UseDragContext'
import { TripCard } from './components/TripCard'

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

const parseDataToPendingItem = <
  T extends {
    id: ColumnType
    name: ColumnType
    estimatedStayTime?: ColumnType
  },
>(
  dataKey: DataKey,
  data: T[]
): ItemInfo[] => {
  return data.map((item) => ({
    id: `${dataKey}-${item.id.value}`,
    origId: item.id.value,
    text: item.name.value,
    estimatedStayTime: item?.estimatedStayTime?.value ?? '',
  }))
}

/** 取得所有按鈕資料 */
const getAllMoveableItems = (data: SortOutData): Record<string, ItemInfo[]> => {
  // 所有可移動項目
  const flatSchedulesData = { ...data[DataKey.schedules] }
  const { [DataKey.schedules]: _, ...filteredData } = data
  const allMoveableItems = {
    ...filteredData,
    ...flatSchedulesData,
  } as Record<string, ItemInfo[]>
  console.error('99-所有可移動項目 =>', allMoveableItems)
  return allMoveableItems
}

const findActivedItem = (
  data: SortOutData,
  id?: UniqueIdentifier
): ItemInfo | null => {
  const tmpItems = getAllMoveableItems(data)
  const mergeData = Object.keys(tmpItems).reduce((acc, key) => {
    return [...acc, ...tmpItems[key]]
  }, [] as ItemInfo[])
  const activeItem = mergeData.find((item) => {
    return item.id === id
  })
  return activeItem || null
}

const SchedulePage: React.FC = () => {
  const { storeData } = useStore()
  // ===== 實際資料 [ start TODO:] ===== //
  // const tours = storeData?.xlsx?.tours
  // const hotels = storeData?.xlsx?.hotels
  // ===== 實際資料 [ end] ===== //

  const tours = fakeTours // TODO: 先用假資料

  // 待安排的景點 =>這邊可能要變成去聽 tours
  let initialTours: ItemInfo[] = !tours
    ? []
    : parseDataToPendingItem(DataKey.tours, tours)
  // 待安排的旅館
  let initialHotels: ItemInfo[] = [
    { id: 'H1', text: '住宿 1', origId: '0' },
    { id: 'H2', text: '住宿 2', origId: '1' },
    { id: 'H3', text: '住宿 3', origId: '2' },
    { id: 'H4', text: '住宿 4', origId: '3' },
    { id: 'H5', text: '住宿 5', origId: '4' },
    { id: 'H6', text: '住宿 6', origId: '5' },
  ] // TODO: 根據 hotels 再做整理
  // 待確認的行程
  let initialSchedules: Record<string, ItemInfo[]> = {
    Day1: [],
  }

  const [pendingTours, setPendingTours] = useState<ItemInfo[]>(initialTours)
  const [pendingHotels, setPendingHotels] = useState<ItemInfo[]>(initialHotels)
  const [confirmedSchedules, setConfirmedSchedules] =
    useState<Record<string, ItemInfo[]>>(initialSchedules)
  const [dayKey, setDayKey] = useState<string>('Day1')

  // 管理排序的資料(含待安排、已安排)
  const [data, setData] = useState<SortOutData>({
    [DataKey.tours]: pendingTours,
    [DataKey.hotels]: pendingHotels,
    [DataKey.schedules]: confirmedSchedules,
  })
  const { cancelDrag } = useDragContext()

  const [activeItem, setActiveItem] = useState<ItemInfo | null>(null)

  useEffect(() => {
    if (data[DataKey.tours].length >= 0) {
      setPendingTours(data[DataKey.tours])
    }

    if (data[DataKey.hotels].length >= 0) {
      setPendingHotels(data[DataKey.hotels])
    }

    if (data[DataKey.schedules][dayKey].length >= 0) {
      const tmpScheduleData = data[DataKey.schedules][dayKey]
      const tmpDataObj = {
        ...data,
        [DataKey.schedules]: {
          ...data[DataKey.schedules],
          [dayKey]: tmpScheduleData,
        },
      }
      setConfirmedSchedules(tmpDataObj[DataKey.schedules])
    }
  }, [data])

  // 處理跨區拖拉
  const handleDragEnd = (event: DragEndEvent) => {
    // 當取消拖拉為 true 時,不做任何動作
    if (!!cancelDrag) return

    const { active, over } = event
    console.log('active', active)
    console.log('over', over)
    if (!over) return
    if (active.id === over.id) {
      // TODO: 要區分他現在是拉到哪一個區塊 這邊有點問題耶
      return
    }

    if (!!active.id) {
      const activeItem = findActivedItem(data, active.id)
      if (activeItem) {
        setActiveItem(activeItem)
      }
    }

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
        targetKey = dayKey
      }
    })

    console.error('99-sourceKey=>', sourceKey)
    console.error('99-targetKey=>', targetKey)

    if (!sourceKey) return
    if (!targetKey) targetKey = dayKey // 預設目標區

    // 如果來源和目標相同，不做任何處理
    // TODO: 同一天的日程可以互調(晚一點再處理)
    if (sourceKey === targetKey) return

    // 所有可移動項目
    const allMoveableItems = getAllMoveableItems(data)
    // 移動項目
    const movedItem = allMoveableItems[sourceKey].find(
      (item) => item.id === active.id
    )

    if (!movedItem) return

    const newSourceList = allMoveableItems[sourceKey].filter(
      (item) => item.id !== active.id
    )

    // TODO: 為什麼 targetKey 會是 null ，要取得 tab 資料
    console.error(
      '99-!allMoveableItems[targetKey] =>',
      !allMoveableItems[targetKey]
    )
    const tmpTargetItem = !allMoveableItems[targetKey]
      ? []
      : allMoveableItems[targetKey].filter((item) => !item.id.includes('empty'))
    console.error('99-tmpTargetItem =>', tmpTargetItem)
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
          ...data[DataKey.schedules],
          [targetKey]: newTargetList,
        },
      }
      console.error('88----------- moveResultObj [check] ---------------')
      console.log('moveResultObj', moveResultObj)
      setData(moveResultObj)
    } else {
      setData(data)
    }

    // 清空當前移動項目
    setActiveItem(null)
  }

  // 更新一天的日程
  const updateDaySchedules = (
    currentDayKey: string,
    scheduleDays: ItemInfo[]
  ) => {
    console.error('updateSchedules =>', scheduleDays)
    // const filteredData = scheduleDays.filter(
    //   (item) => !item.id.includes('empty')
    // )
    setData((prev) => {
      const moveResultObj = {
        ...prev,
        [DataKey.schedules]: {
          ...prev[DataKey.schedules],
          [currentDayKey]: scheduleDays,
        },
      }
      return moveResultObj
    })
  }

  // 更新所有排程
  const updateAllSchedules = (scheduleDays: Record<string, ItemInfo[]>) => {
    setData((prev) => {
      const moveResultObj = {
        ...prev,
        [DataKey.schedules]: scheduleDays,
      }
      return moveResultObj
    })
  }

  // 新增第X天的行程
  const handleAddDay = () => {
    let currentSchedulesObj = Object.assign(data[DataKey.schedules])
    const days = Object.keys(currentSchedulesObj)
    const tmpDayKey = 'Day' + (days.length + 1)
    currentSchedulesObj[tmpDayKey] = []
    setData((prev) => {
      let tmpDataObj = {
        ...prev,
        [DataKey.schedules]: {
          ...prev[DataKey.schedules],
        },
      }
      return tmpDataObj
    })
    setDayKey(tmpDayKey)
    // TODO: 測試他是不是可以亂拉?
  }

  const handleCloseDay = (dayKey: string) => {
    // 取得那個dayKey
    console.log('99-dayKey=>', dayKey)
    // 1. 要根據那一天的行程，把它們回復到原本的位置去
    // 2. 將那一天之後的每個天數都往前挪....
    // TODO: 想到就累
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
          updateDaySchedules={updateDaySchedules}
          updateAllSchedules={updateAllSchedules}
          activeDayKey={dayKey}
          setDayKey={setDayKey}
          handleAddDay={handleAddDay}
          handleCloseDay={handleCloseDay}
        ></ConfirmedSchedules>
      </Box>
      {/* 拖動過程中的 Overlay
       *  優點: 如果畫面有 overflow 的部分時，或非 absolute 的元素時，拖動過程中可以正常顯示
       */}
      <DragOverlay>
        {activeItem ? <TripCard item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default SchedulePage
