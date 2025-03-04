import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { GrAdd, GrClose } from 'react-icons/gr'
import { HiOutlinePrinter } from 'react-icons/hi2'
import { MdDownloading } from 'react-icons/md'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import PrintPreviewDialog from '../../../../components/pdf/PrintPreviewDialog'
import { useStore } from '../../../../hooks/contexts/store-context/UseStore'
import usePrintPreview from '../../../../hooks/UsePrintPreview'
import exportTravelPlanToExcel, {
  filterSpotsAndHotels,
} from '../utils/export-travel-plan-to-excel'
import DailySchedule from './DailySchedule'

interface Props {
  scheduleDays: Record<string, ItemInfo[]>
  activeDayKey: string
  setDayKey: (dayKey: string) => void
  handleAddDay: () => void
  handleCloseDay: (dayKey: string) => void
}
const ConfirmedSchedules: React.FC<Props> = ({
  scheduleDays,
  activeDayKey,
  setDayKey,
  handleAddDay,
  handleCloseDay,
}) => {
  const pdfContentRef = useRef<HTMLDivElement>(null)
  const { pdfUrl, openPreviewWithHtml2canvas } = usePrintPreview()
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const isPlanTrip = import.meta.env.VITE_IS_PLAN_TRIP === 'true'
  const { storeData } = useStore()
  const handlePreviewPDF = async () => {
    if (pdfContentRef.current) {
      await openPreviewWithHtml2canvas(pdfContentRef.current, 'print-schedule') // 呼叫統一的預覽函式
    }
  }

  const handleDownloadExcel = async () => {
    const { filteredSpots, filteredHotels } = filterSpotsAndHotels(
      scheduleDays,
      storeData?.xlsx?.spots ?? [],
      storeData?.xlsx?.hotels ?? []
    )
    exportTravelPlanToExcel(scheduleDays, filteredSpots, filteredHotels)
  }

  useEffect(() => {
    if (pdfUrl) {
      setIsPreviewOpen(true) // 開啟預覽 Dialog
    }
  }, [pdfUrl])

  return (
    <>
      <Box display="flex" flexDir="column">
        <Box
          className="show-border"
          padding="5px"
          display="flex"
          flexDir="row"
          width="100%"
          maxHeight="100%"
          borderRadius="2xl"
          overflowY="auto"
        >
          <Box
            margin="1rem"
            alignContent="center"
            minHeight="20vh"
            borderRight="2px solid var(--chakra-colors-gray-300)"
            fontSize="2xl"
          >
            <Box
              display="flex"
              flexDir="row"
              minWidth="6vw"
              alignItems="center"
              justifyContent="center"
            >
              <Text justifySelf="center">行程</Text>
            </Box>
            <Box display="flex" justifyContent="center">
              <IconButton
                bgColor="transparent"
                color="black"
                size="md"
                aria-label="previewPDF"
                onClick={handlePreviewPDF}
              >
                {/* <MdOutlineDownloading /> */}
                <HiOutlinePrinter />
              </IconButton>
              <IconButton
                bgColor="transparent"
                color="black"
                size="md"
                aria-label="previewPDF"
                onClick={handleDownloadExcel}
              >
                <MdDownloading />
              </IconButton>
            </Box>
          </Box>

          <Box
            width="75vw"
            display="flex"
            flexDir="row"
            padding="0.5rem"
            gap="1rem"
            justifyContent="start"
            maxHeight={isPlanTrip ? '60vh' : '52vh'} // 讓內容區域有最大高度
            overflow="auto"
            whiteSpace="nowrap" // 防止內容換行，保證內容會超出並顯示滾動條
          >
            <VStack
              id="print-schedule"
              align="start"
              ref={pdfContentRef}
              height="auto"
              width="auto"
            >
              <Box display="flex" width="max-content">
                {Object.keys(scheduleDays).map((dayKey) => (
                  <Button
                    key={dayKey}
                    onClick={() => setDayKey(dayKey)}
                    width="25vw"
                    variant={activeDayKey === dayKey ? 'solid' : 'outline'}
                    color={
                      activeDayKey === dayKey ? 'primary.500' : 'primary.300'
                    }
                    bgColor={
                      activeDayKey === dayKey ? 'primary.100' : 'primary.50'
                    }
                  >
                    <Flex justify="space-between" align="center" width="100%">
                      <Box></Box>
                      <Box>{dayKey}</Box>
                      <Box
                        onClick={(e) => {
                          e.stopPropagation() // 防止點擊影響父層按鈕
                          handleCloseDay(dayKey)
                        }}
                      >
                        <GrClose />
                      </Box>
                    </Flex>
                  </Button>
                ))}
                <Button
                  variant="solid"
                  color="primary.300"
                  bgColor="primary.50"
                  onClick={handleAddDay}
                >
                  <GrAdd />
                </Button>
              </Box>

              {/* Tab Panels - All content is visible */}
              <Box display="flex" width="100%" mt="2">
                {Object.entries(scheduleDays).map(([key, value]) => (
                  <Box
                    className="tab-panels-content"
                    id={key}
                    key={key}
                    width="25vw"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={
                      activeDayKey === key ? 'primary.300' : 'primary.50'
                    }
                  >
                    <DailySchedule dayKey={key} data={value}></DailySchedule>
                  </Box>
                ))}
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
      {/* 這是彈出的 PDF 預覽 Dialog */}
      {isPreviewOpen && (
        <Box
          style={{
            position: 'absolute',
            // top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden', // 改為 hidden 確保內容不溢出
          }}
        >
          <PrintPreviewDialog
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)} // 關閉預覽 Dialog
            pdfUrl={pdfUrl}
          />
        </Box>
      )}
    </>
  )
}

export default ConfirmedSchedules
