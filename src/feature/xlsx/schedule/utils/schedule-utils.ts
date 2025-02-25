import { Active, DragEndEvent, Over, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'

// 定義 Enum
export enum DataKey {
  tours = 'tours',
  hotels = 'hotels',
  schedules = 'schedules',
}

export interface SortOutData {
  [DataKey.tours]: ItemInfo[]
  [DataKey.hotels]: ItemInfo[]
  [DataKey.schedules]: Record<string, ItemInfo[]>
}
export type ActionType =
  | 'ADD_EVENT' // 把新的行程拖拉進排程區
  | 'SORT_EVENT_WITHIN_DAY' // 重新排序同一天內的行程
  | 'MOVE_EVENT_TO_ANOTHER_DAY' // 把行程拖到不同日期
  | 'REMOVE_ALL_EVENTS_FROM_DAY' // 只從某一天刪除行程（刪除單日全部行程）
  | 'REMOVE_EVENT_FROM_SPECIFIC_DAY' // 只刪除某一天的一個特定行程

/**
 * 區分拖拉動作類型
 * @param event
 * @returns
 */
export const distinguishAction = (event: DragEndEvent): ActionType | null => {
  let actionType: ActionType | null = null

  const { active, over } = event

  if (!over || !active) return actionType
  const activeDndType = active.data.current?.dndType ?? undefined
  const overDndType = over.data.current?.dndType ?? undefined

  // 新增單一行程
  if (!activeDndType && overDndType) {
    actionType = 'ADD_EVENT'
  }

  // 重新排序同一天內的行程
  if (activeDndType === overDndType && active.id !== over.id) {
    actionType = 'SORT_EVENT_WITHIN_DAY'
  }

  // 把行程拖到不同日期
  if (activeDndType && overDndType && activeDndType !== overDndType) {
    actionType = 'MOVE_EVENT_TO_ANOTHER_DAY'
  }

  return actionType
}

/**
 * 新增單一行程至某一日程中
 */
export const doAddEvent = (
  active: Active,
  over: Over,
  data: SortOutData,
  dayKey: string
): SortOutData => {
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
  const scheduleDataObj = data[DataKey.schedules] as Record<string, ItemInfo[]>
  Object.keys(scheduleDataObj).forEach((key) => {
    const targeData = scheduleDataObj[key] as ItemInfo[]
    if (
      targeData.some((item) => item.id === over.id) ||
      targeData.length === 0
    ) {
      targetKey = dayKey
    }
  })

  if (!sourceKey) return data
  if (!targetKey) targetKey = dayKey // 預設目標區

  // 所有可移動項目
  const allMoveableItems = getAllMoveableItems(data)
  // 移動項目
  const movedItem = allMoveableItems[sourceKey].find(
    (item) => item.id === active.id
  )

  if (!movedItem) return data

  const newSourceList = allMoveableItems[sourceKey].filter(
    (item) => item.id !== active.id
  )

  const tmpTargetItem = !allMoveableItems[targetKey]
    ? []
    : allMoveableItems[targetKey]
  // : allMoveableItems[targetKey].filter((item) => !item.id.includes('empty'))
  // const newTargetList = [...tmpTargetItem, movedItem]
  const newTargetList = replaceFirstEmptyTrip(tmpTargetItem, movedItem)

  console.log('------------- 整理 [start] ---------------')
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
        [targetKey]: checkScheduleTimeFunc(newTargetList),
      },
    }
    console.log('moveResultObj', moveResultObj)
    return moveResultObj
  } else {
    return data
  }
}

/** */
export const sortEventWithinDay = (
  active: Active,
  over: Over,
  confirmedSchedules: Record<string, ItemInfo[]>
): { dayKey: string; items: ItemInfo[] } | null => {
  const dayKey = over.data.current?.dndType
  if (!dayKey) return null
  const scheduleItems = confirmedSchedules[dayKey]

  if (dayKey && active.id !== over?.id) {
    const oldIndex = scheduleItems.findIndex((e) => e.id === active.id)
    const newIndex = scheduleItems.findIndex((e) => e.id === over?.id)
    const checkScheduleTimeItems = checkScheduleTimeFunc(
      arrayMove(scheduleItems, oldIndex, newIndex)
    )
    return {
      dayKey,
      items: checkScheduleTimeItems,
    }
  }

  return null
}

export const moveEventToAnotherDay = (
  active: Active,
  over: Over,
  data: SortOutData
): SortOutData => {
  const sourceDayKey = active.data.current?.dndType
  const targetDayKey = over.data.current?.dndType

  if (!sourceDayKey || !targetDayKey) return data
  // 待交換的總項目
  const sourceItems = [...data[DataKey.schedules][sourceDayKey]]
  const targetItems = [...data[DataKey.schedules][targetDayKey]]

  const sourceIndex = sourceItems.findIndex((item) => item.id === active.id)
  const targetIndex = targetItems.findIndex((item) => item.id === over.id)
  if (
    sourceIndex < 0 ||
    sourceIndex >= sourceItems.length ||
    targetIndex < 0 ||
    targetIndex >= targetItems.length
  ) {
    console.error('Invalid index')
    return data
  }

  // 取出要交換的項目
  const sourceItem = sourceItems.find((item) => item.id === active.id)
  const targetItem = targetItems.find((item) => item.id === over.id)

  // 交換項目
  let newSourceItems = [
    ...sourceItems.slice(0, sourceIndex),
    targetItem,
    ...sourceItems.slice(sourceIndex + 1),
  ] as ItemInfo[]
  let newTargetItems = [
    ...targetItems.slice(0, targetIndex),
    sourceItem,
    ...targetItems.slice(targetIndex + 1),
  ] as ItemInfo[]

  const moveResultObj = {
    ...data,
    [DataKey.schedules]: {
      ...data[DataKey.schedules],
      [sourceDayKey]: checkScheduleTimeFunc(newSourceItems),
      [targetDayKey]: checkScheduleTimeFunc(newTargetItems),
    },
  }
  return moveResultObj
}

export const findActivedItem = (
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

export const generateEmptyItem = (dayKey: string, amount: number) => {
  return Array.from({ length: amount }, (_, i) => ({
    id: `empty${dayKey}-${i}`,
    origId: `${i}`,
    text: '',
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
  return allMoveableItems
}

/** 取代第一個 id 有 empty 的日程 */
const replaceFirstEmptyTrip = (
  schedules: ItemInfo[],
  scheduleItem: ItemInfo
): ItemInfo[] => {
  const replaceIndex = schedules.findIndex((item) => item.id.includes('empty'))
  let tmpSchedule = [
    ...schedules.slice(0, replaceIndex),
    scheduleItem,
    ...schedules.slice(replaceIndex + 1),
  ]
  return tmpSchedule as ItemInfo[]
}

const checkScheduleTimeFunc = (scheduleItems: ItemInfo[]) => {
  const needToChangeIndex: number[] = []
  const result = scheduleItems.map((item, index) => {
    if (item.estimatedStayTime) {
      for (let i = index; i < index + +item.estimatedStayTime; i++) {
        needToChangeIndex.push(i)
      }
    }

    if (needToChangeIndex.includes(index)) {
      if (item.id.startsWith('empty')) {
        item.id = `occupied-${item.origId}`
      }
    } else {
      if (item.id.startsWith('occupied')) {
        item.id = `empty-${item.origId}`
      }
    }
    return item
  })

  return result
}
