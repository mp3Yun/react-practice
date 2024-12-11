import { Box, useDisclosure } from '@chakra-ui/react'
import ExpandableTextCard from '../../components/expandableTextCards/ExpandableTextCard'
import expandableTextDataSet from '../../dataSet/expandableText-data'
import { ChakraIcons, createIcon, SvgIcons } from '../../utils/icons-utils'
import FixedButton from '../../components/buttons/FixedButton'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'

const MainPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // 我的模擬資料
  const expandableTextData = [...expandableTextDataSet]
  return (
    <>
      {/* icon 測試區 */}
      <Box>
        <div>
          {/* 動態創建 AddIcon */}
          {createIcon(ChakraIcons.Add, {
            boxSize: 6,
            color: 'blue.500',
          })}

          {/* 動態創建 DeleteIcon */}
          {createIcon(ChakraIcons.Delete, {
            boxSize: 8,
            color: 'red.500',
          })}

          {/* 動態創建 EditIcon */}
          {createIcon(ChakraIcons.Edit, {
            boxSize: 10,
            color: 'green.500',
          })}

          {/* 動態創建 InfoIcon */}
          {createIcon(ChakraIcons.Info, {
            boxSize: 10,
            color: 'primary.500',
          })}
          {/* 自定義 SVG Icon */}
          {createIcon(SvgIcons.React, {
            imgProps: { width: 50, height: 50, alt: 'Custom Icon 1' },
          })}
        </div>
      </Box>

      {/* 展開卡片測試 */}
      {expandableTextData.map((text, index) => (
        <ExpandableTextCard
          key={index}
          mt={'1rem'}
          text={text}
        ></ExpandableTextCard>
      ))}

      <Box>
        <FixedButton onClick={onOpen} />
        <ConfirmDialog
          isOpen={isOpen}
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
