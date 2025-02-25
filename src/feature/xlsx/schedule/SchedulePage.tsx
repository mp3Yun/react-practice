import { Box } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { ItemInfo } from '../../../components/dragDrop/CrossZoneDragger'
import { ColumnType } from '../../../helper/report-parser-content/report.type'
import { useDragContext } from '../../../hooks/contexts/drag-context/UseDragContext'
import { useStore } from '../../../hooks/contexts/store-context/UseStore'
import { fakeTours } from '../data/fakeTours'
import ConfirmedSchedules from './components/ConfirmedSchedules'
import PendingHotels from './components/PendingHotels'
import PendingTours from './components/PendingTours'
import { TripCard } from './components/TripCard'
import {
  DataKey,
  distinguishAction,
  doAddEvent,
  findActivedItem,
  generateEmptyItem,
  moveEventToAnotherDay,
  sortEventWithinDay,
  SortOutData,
} from './utils/schedule-utils'

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

const SchedulePage: React.FC = () => {
  const { storeData } = useStore()
  // ===== 實際資料 [ start TODO:] ===== //
  // const tours = storeData?.xlsx?.tours
  // const hotels = storeData?.xlsx?.hotels
  const [dayKey, setDayKey] = useState<string>('Day1')
  // ===== 實際資料 [ end] ===== //

  const tours = fakeTours // TODO: 先用假資料

  // 待安排的景點 =>這邊可能要變成去聽 tours
  let initialTours: ItemInfo[] = !tours
    ? []
    : parseDataToPendingItem(DataKey.tours, tours)
  // 待安排的旅館
  let initialHotels: ItemInfo[] = [
    { id: 'hotels-1', text: '住宿 1', origId: '0' },
    { id: 'hotels-2', text: '住宿 2', origId: '1' },
    { id: 'hotels-3', text: '住宿 3', origId: '2' },
    { id: 'hotels-4', text: '住宿 4', origId: '3' },
    { id: 'hotels-5', text: '住宿 5', origId: '4' },
    { id: 'hotels-6', text: '住宿 6', origId: '5' },
  ] // TODO: 根據 hotels 再做整理
  // 待確認的行程
  let initialSchedules: Record<string, ItemInfo[]> = {
    Day1: [...generateEmptyItem(dayKey, 16)],
  }

  const [pendingTours, setPendingTours] = useState<ItemInfo[]>(initialTours)
  const [pendingHotels, setPendingHotels] = useState<ItemInfo[]>(initialHotels)
  const [confirmedSchedules, setConfirmedSchedules] =
    useState<Record<string, ItemInfo[]>>(initialSchedules)

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

    if (!over) return
    // [view] 讓拖拉元件看起來更為流暢，在 DragOverlay 中使用
    if (!!active.id) {
      const activeItem = findActivedItem(data, active.id)
      if (activeItem) {
        setActiveItem(activeItem)
      }
    }

    // [logic] 1. 識別當前拖拉類型
    const actionType = distinguishAction(event)
    console.error('99-actionType=>', actionType)

    // [login] 2. 根據不同拖拉類型
    switch (actionType) {
      case 'ADD_EVENT': {
        let tmpData = doAddEvent(active, over, data, dayKey)
        setData(tmpData)
        break
      }
      case 'SORT_EVENT_WITHIN_DAY': {
        let tmpData = sortEventWithinDay(active, over, confirmedSchedules)
        if (!tmpData) return
        updateDaySchedules(tmpData.dayKey, tmpData.items)
        break
      }
      case 'MOVE_EVENT_TO_ANOTHER_DAY': {
        let tmpData = moveEventToAnotherDay(active, over, data)
        setData(tmpData)
        break
      }
      default:
        console.log('unexpect action type')
        break
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

  // 新增第X天的行程
  const handleAddDay = () => {
    let currentSchedulesObj = Object.assign(data[DataKey.schedules])
    const days = Object.keys(currentSchedulesObj)
    const tmpDayKey = 'Day' + (days.length + 1)
    currentSchedulesObj[tmpDayKey] = [...generateEmptyItem(tmpDayKey, 16)]
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
  }

  const handleCloseDay = (dayKey: string) => {
    // 1. 取得 dayKey 的資料 且過濾空值
    const removeItems = confirmedSchedules[dayKey].filter(
      (item) => !item.id.includes('empty')
    )
    if (!removeItems) return

    // 2. 要根據那一天的行程，把它們回復到原本的位置去(可以根據 id 來切割)
    const tmpData = Object.assign({}, data)
    removeItems.forEach((item) => {
      const dataKey = item.id.split('-')[0] as keyof Omit<
        SortOutData,
        DataKey.schedules
      >
      tmpData[dataKey]?.push(item)
    })
    // 3. 將那一天之後的每個天數都往前挪....
    const currentDays = Object.keys(tmpData[DataKey.schedules])
    const filterDeleteDays = currentDays.filter((item) => item !== dayKey)
    if (filterDeleteDays.length === 0 && dayKey === 'Day1') {
      setDayKey('Day1')
      const removeResultObj = {
        ...tmpData,
        [DataKey.schedules]: {
          [dayKey]: [...generateEmptyItem(dayKey, 16)],
        },
      }
      setData(removeResultObj)
    } else {
      // 小於刪除那天的都要往前排
      const deleteNumber = dayKey.replace('Day', '')
      const filterDeleteNumbers = filterDeleteDays.map((item) =>
        item.replace('Day', '')
      )
      let adjustSchedules: Record<string, ItemInfo[]> = {}

      Object.entries(tmpData[DataKey.schedules]).forEach(([key, value]) => {
        const xDay = key.replace('Day', '')
        const newXDay = xDay > deleteNumber ? 'Day' + (+xDay - 1) : 'Day' + xDay
        if (filterDeleteNumbers.includes(xDay)) {
          adjustSchedules = {
            ...adjustSchedules,
            [newXDay]: value,
          }
        }
      })
      const removeResultObj = {
        ...tmpData,
        [DataKey.schedules]: {
          ...adjustSchedules,
        },
      }
      setData(removeResultObj)
      const prevDay =
        +deleteNumber - 1 === 0 ? 'Day1' : 'Day' + (+deleteNumber - 1)
      setDayKey(prevDay)
    }
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
