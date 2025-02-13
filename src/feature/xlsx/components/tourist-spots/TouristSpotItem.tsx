import { Box, Link, Table } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiHeart } from 'react-icons/hi'
import TourDetail from '../../../../helper/report-parser-content/reports/tours-parser/tour-detail'
import { useStore } from '../../../../hooks/contexts/store-context/UseStore'

// const TouristSpotItem: React.FC<{ data: TourDetail }> = ({ data }) => {
//   const [isLike, setIsLike] = useState(data.isLike)
//   const [bgColor, setBgColor] = useState('')
//   const isValidURL = (url: string) => {
//     try {
//       new URL(url)
//       return true
//     } catch (_) {
//       return false
//     }
//   }
//   return (
//     <Box
//       borderBottom="1px dashed var(--chakra-colors-secondary-500)"
//       padding="1rem"
//     >
//       <Table.Root
//         size="lg"
//         variant="outline"
//         bgColor={isLike ? 'var(--chakra-colors-primary-100)' : ''}
//       >
//         <Table.Body>
//           <Table.Row>
//             <Table.Cell
//               rowSpan={13}
//               width="80px"
//               style={{ fontSize: '2rem', cursor: 'pointer' }}
//               onClick={() => {
//                 setIsLike(!isLike)
//               }}
//             >
//               <HiHeart
//                 fontSize="2xl"
//                 color={isLike ? 'var(--chakra-colors-secondary-700)' : ''}
//               />
//             </Table.Cell>
//             <Table.Cell width="150px">{data.id}</Table.Cell>
//             <Table.Cell>{data.name}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>資訊:</Table.Cell>
//             <Table.Cell>
//               {isValidURL(data.info) ? (
//                 <Link
//                   href={data.info}
//                   target="_blank"
//                   color="var(--chakra-colors-secondary-500)"
//                 >
//                   {data.info}
//                 </Link>
//               ) : (
//                 data.info
//               )}
//             </Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>特別的地方:</Table.Cell>
//             <Table.Cell>{data.special}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>價格:</Table.Cell>
//             <Table.Cell>{data.price}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>開放日期:</Table.Cell>
//             <Table.Cell>{data.openDate}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>營業時間:</Table.Cell>
//             <Table.Cell>{data.openingHours}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>地點:</Table.Cell>
//             <Table.Cell>{data.location}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>交通:</Table.Cell>
//             <Table.Cell>{data.transportation}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>通勤時間:</Table.Cell>
//             <Table.Cell>{data.commuteTime}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>預計停留間:</Table.Cell>
//             <Table.Cell>{data.estimatedStayTime}</Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>照片1:</Table.Cell>
//             <Table.Cell>
//               {data.image1?.includes('data:image') ? (
//                 <img src={data.image1} width="800px" height="auto"></img>
//               ) : (
//                 `${data.image1}`
//               )}
//             </Table.Cell>
//           </Table.Row>
//           <Table.Row>
//             <Table.Cell>照片2:</Table.Cell>
//             <Table.Cell>
//               {data.image2?.includes('data:image') ? (
//                 <img src={data.image2} width="800px" height="auto"></img>
//               ) : (
//                 `${data.image2}`
//               )}
//             </Table.Cell>
//           </Table.Row>
//         </Table.Body>
//       </Table.Root>
//     </Box>
//   )
// }

// 定義 TourDetailView
export type TourDetailValue = {
  [K in keyof TourDetail]: {
    name: string
    value: string
  }
}

const TouristSpotItem: React.FC<{ data: TourDetailValue }> = ({ data }) => {
  const [isLike, setIsLike] = useState(data.isLike.value === 'Y')
  const { setStoreData } = useStore()

  useEffect(() => {
    if (isLike) {
      // 儲存景點
      setStoreData((prevState) => ({
        ...prevState,
        xlsx: {
          ...prevState.xlsx,
          tours: [...(prevState.xlsx?.tours || []), data],
        },
      }))
    } else {
      // 移除景點
      setStoreData((prevState) => ({
        ...prevState,
        xlsx: {
          ...prevState.xlsx,
          tours: (prevState.xlsx?.tours ?? []).filter(
            (item) => item.id.value !== data.id.value
          ),
        },
      }))
    }
  }, [isLike])

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
    >
      <Table.Root
        size="lg"
        variant="outline"
        bgColor={isLike ? 'var(--chakra-colors-primary-100)' : ''}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell
              rowSpan={13}
              width="80px"
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
            <Table.Cell width="150px">{data.id.value}</Table.Cell>
            <Table.Cell>{data.name.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>資訊:</Table.Cell>
            <Table.Cell>
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
            <Table.Cell>特別的地方:</Table.Cell>
            <Table.Cell>{data.special.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>價格:</Table.Cell>
            <Table.Cell>{data.price.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>開放日期:</Table.Cell>
            <Table.Cell>{data.openDate.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>營業時間:</Table.Cell>
            <Table.Cell>{data.openingHours.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>地點:</Table.Cell>
            <Table.Cell>{data.location.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>交通:</Table.Cell>
            <Table.Cell>{data.transportation.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>通勤時間:</Table.Cell>
            <Table.Cell>{data.commuteTime?.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>預計停留間:</Table.Cell>
            <Table.Cell>{data.estimatedStayTime?.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>照片1:</Table.Cell>
            <Table.Cell>
              {data.image1?.value.includes('data:image') ? (
                <img src={data.image1.value} width="800px" height="auto"></img>
              ) : (
                `${data.image1?.value}`
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>照片2:</Table.Cell>
            <Table.Cell>
              {data.image2?.value.includes('data:image') ? (
                <img src={data.image2.value} width="800px" height="auto"></img>
              ) : (
                `${data.image2?.value}`
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default TouristSpotItem
