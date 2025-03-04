import { Box, useDisclosure, Text } from '@chakra-ui/react'
import FixedButton from '../../components/buttons/FixedButton'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import Favorites from './components/Favorites'
import { useLoading } from '../../hooks/LoadingContext'

const MainPage: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure()
  const { showLoading, hideLoading } = useLoading()
  // 我的模擬資料
  // const expandableTextData = [...expandableTextDataSet]

  // 模擬異步操作
  const handleAction = async () => {
    showLoading()
    // 模擬異步操作
    const result = await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('result', result)
    hideLoading()
    onOpen()
  }

  const isPlanTrip = import.meta.env.VITE_IS_PLAN_TRIP === 'true'
  return (
    <>
      {/* 我的最愛 */}
      {!isPlanTrip && <Favorites></Favorites>}
      <Box
        display="flex"
        flexDirection="column"
        color="gray.600"
        fontSize="20px"
        gap="2rem"
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bolder">
            自由行日程安排功能
          </Text>
          <p>本功能提供使用者自訂每日行程，透過拖放方式輕鬆規劃時間與活動。</p>
        </Box>
        <Box lineHeight="2rem" fontSize="20px">
          <li>
            <strong>主要功能：</strong>
            拖放操作：使用者可將活動拖曳至不同時段，自由調整行程。
          </li>
          <li>
            <strong>跨區拖動：</strong>
            允許使用者在不同日期間移動活動，靈活規劃。
          </li>
          <li>
            <strong>時間區間設定：</strong>日程範圍從 08:00 至
            24:00，每小時一格，清晰展示行程安排。
          </li>
          <li>
            <strong>直覺化介面：</strong>透過視覺化排程，快速檢視與調整行程。
          </li>
          <li>
            此功能簡化行程安排流程，使使用者能夠高效地計畫自由行，提升旅遊體驗。
          </li>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="1.5rem"
          alignContent="center"
        >
          <Text fontSize="2xl" fontWeight="bolder">
            操作簡易說明
          </Text>
          <Box>
            <li>下載範例，修改資料後，再匯入資料</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/01.png"
                style={{ maxWidth: '1050px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/02.png"
                style={{ maxWidth: '1050px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          <Box>
            <li>選取想要的景點/住宿</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/03.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/04.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          <Box>
            <li>已匯入所有資料且選取後，進入安排行程</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/05.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/06.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          <Box>
            <li>根據日程規劃，將一天需要的日程拖曳至當天</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/07.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/08.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          {/* <Box>
            <li>根據當天行程來安排各景點的時程</li>
            <p></p>
          </Box> */}
          <Box>
            <li>若想更換不同天的行程，請直接拖曳至當天</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/09.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/10.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          <Box>
            <li>安排好後，可以點選列印，可列印日程畫面，或直接下載PDF</li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/11.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/12.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
          <Box>
            <li>
              亦可直接點擊下載，下載按鈕會匯出excel資料，內容為安排的日程，景點、住宿資訊
            </li>
            <Box
              className="show-border"
              p="1rem"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/guides/13.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/14.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
              <img
                src="/guides/15.png"
                style={{ maxWidth: '900px', maxHeight: '100%' }}
              ></img>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* icon 測試區 */}
      {/* <Box>
        <div>
          {createIcon(ChakraIcons.Add, {
            boxSize: 6,
            color: 'blue.500',
          })}

          {createIcon(ChakraIcons.Delete, {
            boxSize: 8,
            color: 'red.500',
          })}

          {createIcon(ChakraIcons.Edit, {
            boxSize: 10,
            color: 'green.500',
          })}

          {createIcon(ChakraIcons.Info, {
            boxSize: 10,
            color: 'primary.500',
          })}
          {createIcon(SvgIcons.React, {
            imgProps: { width: 50, height: 50, alt: 'Custom Icon 1' },
          })}
        </div>
      </Box> */}

      {/* 展開卡片測試 */}
      {/* {expandableTextData.map((text, index) => (
        <ExpandableTextCard
          key={index}
          mt={'1rem'}
          text={text}
        ></ExpandableTextCard>
      ))} */}

      {!isPlanTrip && (
        <Box>
          <FixedButton onClick={handleAction} />
          <ConfirmDialog
            isOpen={open}
            onConfirm={onClose}
            onClose={onClose}
            confirmTitle={'新增一筆 note'}
            confirmMessage={'是否新增一筆 note?'}
          ></ConfirmDialog>
        </Box>
      )}
    </>
  )
}

export default MainPage
