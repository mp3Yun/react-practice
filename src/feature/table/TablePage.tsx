import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Table, TableCaption, IconButton, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { sortByCustomCondition, SortTerm } from '../../utils/array-utils'

type SortOrder = 'ASC' | 'DESC' | 'CANCEL'
type SortState = { field: string; order: SortOrder }
const TablePage: React.FC = () => {
  // 原始資料
  const originalData = [
    { toConvert: 'inches', into: 'millimetres (mm)', multiplyBy: 25.4 },
    { toConvert: 'feet', into: 'centimetres (cm)', multiplyBy: 30.48 },
    { toConvert: 'yards', into: 'metres (m)', multiplyBy: 0.91444 },
    { toConvert: 'asdw', into: 'bdfb', multiplyBy: 0.91444 },
    { toConvert: 'asdw', into: 'awewe', multiplyBy: 0.81444 },
    { toConvert: 'asdw', into: 'sdasdw', multiplyBy: 0.91444 },
  ]

  // 管理排序的條件狀態
  const [sortState, setSortState] = useState<SortState[]>([])
  // 管理顯示的畫面資料
  const [data, setData] = useState(originalData)

  // 處理排序狀態
  const handleSort = (field: string) => {
    setSortState((prev) => {
      // 找出先前是否已有該欄的排序條件
      const prevFieldState = prev.find((s) => s.field === field)
      let newSortState: SortState[] = []
      if (prevFieldState) {
        // 表示已存在該排序條件，切換排序狀態
        newSortState = prev
          .map((s) => {
            if (s.field === field) {
              // 只改變那一欄的切換排序狀態
              if (prevFieldState.order === 'ASC') {
                return { ...s, order: 'DESC' }
              } else if (prevFieldState.order === 'DESC') {
                // return null
                return { ...s, order: 'CANCEL' }
              }
            }
            return s
          })
          .filter((s) => s !== null && s.order !== 'CANCEL') as SortState[]
      } else {
        // 表示不存在該排序條件，新增排序條件
        newSortState = [...prev, { field, order: 'ASC' }]
      }

      // 處理畫面的呈現 (原本寫在 useEffect 中的)
      const sortTerms: SortTerm<(typeof originalData)[0]>[] = newSortState.map(
        (s) => ({
          fieldName: s.field as keyof (typeof originalData)[0],
          isASC: s.order === 'ASC',
        })
      )
      setData(sortByCustomCondition(originalData, sortTerms))

      return newSortState
    })
  }

  // 依據排序狀態，變更每欄的排序顯示
  const renderSortIcon = (field: string) => {
    const sort = sortState.find((s) => s.field === field)
    if (!sort || sort.order === 'CANCEL') return undefined
    return sort.order === 'ASC' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  return (
    <Box>
      <Box>
        <h3>請點擊欄位名稱來進行多條件的排序</h3>
      </Box>
      <Table.Root variant="outline" colorScheme="teal">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              <IconButton
                aria-label="Sort To Convert"
                onClick={() => handleSort('toConvert')}
                variant="ghost"
              >
                {renderSortIcon('toConvert')}
              </IconButton>
              To convert
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <IconButton
                aria-label="Sort Into"
                onClick={() => handleSort('into')}
                variant="ghost"
              >
                {renderSortIcon('into')}
              </IconButton>
              into
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <IconButton
                aria-label="Sort Into"
                onClick={() => handleSort('multiplyBy')}
                variant="ghost"
              >
                {renderSortIcon('multiplyBy')}
              </IconButton>
              multiply by
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.toConvert}</Table.Cell>
              <Table.Cell>{item.into}</Table.Cell>
              <Table.Cell>{item.multiplyBy}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>To convert</Table.Cell>
            <Table.Cell>into</Table.Cell>
            <Table.Cell>multiply by</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  )
}

export default TablePage
