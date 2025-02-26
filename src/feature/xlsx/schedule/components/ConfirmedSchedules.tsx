import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { GrAdd, GrClose } from 'react-icons/gr'
import { HiOutlinePrinter } from 'react-icons/hi2'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import DailySchedule from './DailySchedule'
import usePrintPreview from '../../../../hooks/UsePrintPreview'
import PrintPreviewDialog from '../../../../components/pdf/PrintPreviewDialog'
import { printToPDF } from '../../../../utils/pdf-utils'

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
  const { pdfUrl, openPreview } = usePrintPreview()
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const handlePreviewPDF = async () => {
    if (pdfContentRef.current) {
      await openPreview(pdfContentRef.current) // 呼叫統一的預覽函式
      console.error('我是元件頁，這時候 pdfUrl 應該要有東西 =>', pdfUrl)
    }
  }

  useEffect(() => {
    if (pdfUrl) {
      setIsPreviewOpen(true) // 開啟預覽 Dialog
      console.error('我是元件頁，isPreviewOpen =>', isPreviewOpen)
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
            >
              <Text textAlign="start" justifySelf="center">
                行程
              </Text>
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
            </Box>
          </Box>

          <Box
            width="75vw"
            display="flex"
            flexDir="row"
            padding="0.5rem"
            gap="1rem"
            justifyContent="start"
            maxHeight="52vh" // 讓內容區域有最大高度
            overflow="auto"
            whiteSpace="nowrap" // 防止內容換行，保證內容會超出並顯示滾動條
          >
            <VStack align="start" ref={pdfContentRef}>
              <Box display="flex" width="max-content">
                {Object.keys(scheduleDays).map((dayKey, index) => (
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
