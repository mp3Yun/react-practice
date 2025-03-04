import {
  Box,
  DialogBody,
  DialogContent,
  DialogRoot,
  Portal,
} from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { ReportType } from '../../../../helper/report-parser-content/report-parser-context'
import { useStore } from '../../../../hooks/contexts/store-context/UseStore'
import ResultDisplay from '../../components/ResultDisplay'

interface Props extends PropsWithChildren {
  itemInfo: ItemInfo
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

function convertToReport(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1) + 'Report'
}

const DetailTripCard: React.FC<Props> = ({
  itemInfo,
  isOpen,
  onConfirm,
  onClose,
}) => {
  const category = itemInfo.id.split('-')[0]
  const oriId = itemInfo.origId
  const { storeData } = useStore()
  const [itemDetail, setItemDetail] = useState<any>(null)
  const [showData, setShowData] = useState<any[]>([])
  const [isLoading, seyIsLoading] = useState<boolean>(true)
  // 1. print pdf
  // 2. get data for useStore

  console.log('onConfirm', onConfirm)

  useEffect(() => {
    if (storeData !== null) {
      const tmpDataItems = storeData?.xlsx
        ? storeData.xlsx[category as keyof typeof storeData.xlsx]
        : undefined
      if (tmpDataItems) {
        const tmpItemDetail = tmpDataItems.find(
          (item: any) => item.id.value === oriId
        )
        if (tmpItemDetail) {
          setItemDetail(tmpItemDetail)
        } else {
          setItemDetail(null)
        }
      }
    } else {
      setItemDetail(null)
    }
  }, [isOpen, storeData])

  useEffect(() => {
    if (itemDetail) {
      seyIsLoading(false)
      setShowData([itemDetail])
    }
  }, [itemDetail])

  return (
    <Portal>
      <DialogRoot
        open={isOpen}
        onOpenChange={onClose}
        size="cover"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            maxWidth: '80vw', // 限制最大寬度，避免過大
            width: 'auto',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 500,
            overflow: 'auto',
            pointerEvents: 'auto',
          }}
        >
          <DialogBody
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p="2"
            width="auto" // A 的寬度會根據 B 的大小自動調整
            height="auto" // A 的高度會根據 B 的大小自動調整
            maxWidth="75rem" // 最大寬度限制
            maxHeight="50rem" // 最大高度限制
            overflow="auto"
            pointerEvents="auto" // 讓內容仍然能夠互動
          >
            {/* result */}
            {showData.length > 0 && !isLoading ? (
              <ResultDisplay
                reportType={convertToReport(category) as ReportType}
                parsedData={showData}
                isLoading={false}
                justForShow={true}
              ></ResultDisplay>
            ) : (
              <Box>no data</Box>
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Portal>
  )
}

export default DetailTripCard
