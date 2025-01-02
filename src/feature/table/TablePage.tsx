import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
} from '@chakra-ui/react'
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
      if (prevFieldState) {
        // 表示已存在該排序條件，切換排序狀態
        return prev
          .map((s) => {
            if (s.field === field) {
              // 只改變那一欄的切換排序狀態
              if (prevFieldState.order === 'ASC') {
                return { ...s, order: 'DESC' }
              } else if (prevFieldState.order === 'DESC') {
                return null
              }
            }
            return s
          })
          .filter((s) => s !== null) as SortState[]
      } else {
        // 表示不存在該排序條件，新增排序條件
        return [...prev, { field, order: 'ASC' }]
      }
    })
  }

  // 依據排序狀態，變更每欄的排序顯示
  const renderSortIcon = (field: string) => {
    const sort = sortState.find((s) => s.field === field)
    if (!sort || sort.order === 'CANCEL') return undefined
    return sort.order === 'ASC' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  // 處理多重條件排序
  const getSortedData = () => {
    if (sortState.length === 0) return originalData

    // 將條件轉為排序條件
    const sortTerms: SortTerm<(typeof originalData)[0]>[] = sortState.map(
      (s) => {
        return {
          fieldName: s.field as keyof (typeof originalData)[0],
          isASC: s.order === 'ASC',
        }
      }
    )

    return sortByCustomCondition(originalData, sortTerms)
  }

  // 重新渲染畫面
  useEffect(() => {
    console.log('重新渲染畫面-新的條件', sortState)
    const tmpSortData = getSortedData()
    console.log('重新渲染畫面', tmpSortData)
    setData(tmpSortData)
  }, [sortState])

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>
              <IconButton
                aria-label="Sort To Convert"
                onClick={() => handleSort('toConvert')}
                variant="ghost"
                icon={renderSortIcon('toConvert')}
              ></IconButton>
              To convert
            </Th>
            <Th>
              <IconButton
                aria-label="Sort Into"
                onClick={() => handleSort('into')}
                variant="ghost"
                icon={renderSortIcon('into')}
              ></IconButton>
              into
            </Th>
            <Th isNumeric>
              <IconButton
                aria-label="Sort Into"
                onClick={() => handleSort('multiplyBy')}
                variant="ghost"
                icon={renderSortIcon('multiplyBy')}
              ></IconButton>
              multiply by
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.toConvert}</Td>
              <Td>{item.into}</Td>
              <Td isNumeric>{item.multiplyBy}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TablePage
