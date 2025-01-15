import { Box, useDisclosure } from '@chakra-ui/react'
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
    hideLoading()
    onOpen()
  }
  return (
    <>
      {/* 我的最愛 */}
      <Favorites></Favorites>
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
    </>
  )
}

export default MainPage
