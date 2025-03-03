import { useEffect, useState } from 'react'
import { useStore } from '../../../../hooks/contexts/store-context/UseStore'
import HotelDetail from '../../../../helper/report-parser-content/reports/hotels-parser/hotel-detail'
import { Box, Link, Table } from '@chakra-ui/react'
import { HiHeart } from 'react-icons/hi'

// 定義 SpotDetailView
export type HotelDetailValue = {
  [K in keyof HotelDetail]: {
    name: string
    value: string
  }
}

interface Props {
  data: HotelDetailValue
  justForShow?: boolean
}
const HotelItem: React.FC<Props> = ({ data, justForShow }) => {
  const [isLike, setIsLike] = useState(data.isLike.value === 'Y')
  const { setStoreData } = useStore()
  useEffect(() => {
    if (justForShow) return
    if (isLike) {
      // 儲存景點
      setStoreData((prevState) => ({
        ...prevState,
        xlsx: {
          ...prevState.xlsx,
          hotels: [...(prevState.xlsx?.hotels || []), data],
        },
      }))
    } else {
      // 移除景點
      setStoreData((prevState) => ({
        ...prevState,
        xlsx: {
          ...prevState.xlsx,
          hotels: (prevState.xlsx?.hotels ?? []).filter(
            (item) => item.id.value !== data.id.value
          ),
        },
      }))
    }
  }, [isLike, justForShow])

  const isValidURL = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (_) {
      return false
    }
  }

  return (
    <Box
      borderBottom="1px dashed var(--chakra-colors-secondary-500)"
      padding="1rem"
      width="100%" // 第二層寬度佔滿外層
      height="100%" // 第二層高度佔滿外層
      maxWidth="100%" // 不超過上一層的寬度
      maxHeight="100%" // 不超過上一層的高度
      overflow="auto" // 讓內容溢出時出現滾動條
      style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
    >
      <Table.Root
        size="lg"
        variant="outline"
        bgColor={isLike ? 'var(--chakra-colors-primary-100)' : ''}
        width="100%" // 子元素根據內容成長
        height="auto" // 子元素高度根據內容增長
        maxWidth="100%" // 確保不超過父元素的最大寬度
        maxHeight="100%" // 確保不超過父元素的最大高度
        overflow="hidden" // 防止內部溢出
        tableLayout="fixed"
      >
        <Table.Body>
          <Table.Row>
            {justForShow ? (
              <Table.Cell width="5rem">編號</Table.Cell>
            ) : (
              <Table.Cell
                rowSpan={13}
                width="5rem"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => {
                  setIsLike(!isLike)
                }}
              >
                <HiHeart
                  fontSize="2xl"
                  color={isLike ? 'var(--chakra-colors-secondary-700)' : ''}
                />
              </Table.Cell>
            )}
            <Table.Cell width="10rem">{data.id.value}</Table.Cell>
            <Table.Cell>{data.name.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>資訊:</Table.Cell>
            <Table.Cell colSpan={2}>
              {isValidURL(data.info.value) ? (
                <Link
                  href={data.info.value}
                  target="_blank"
                  color="var(--chakra-colors-secondary-500)"
                >
                  {data.info.value}
                </Link>
              ) : (
                data.info.value
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.special.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.special.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.price.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.price.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.checkinTime.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.checkinTime.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.checkoutTime.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.checkoutTime.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.location.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.location.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{data.transportation.name}:</Table.Cell>
            <Table.Cell colSpan={2}>{data.transportation.value}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default HotelItem
