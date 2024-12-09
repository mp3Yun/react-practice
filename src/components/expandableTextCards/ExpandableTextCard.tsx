import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  useDisclosure,
  Text,
  Button,
  Flex,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  BoxProps,
} from '@chakra-ui/react'
import React from 'react'

interface ExpandableTextProps extends BoxProps {
  text: string
  maxLines?: number // 可自定義顯示行數，預設3行
}

const ExpandableTextCard: React.FC<ExpandableTextProps> = ({
  text,
  maxLines = 3,
  ...boxProps
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 所有行數整理
  const lines = text.split(' ') || []
  // part1 可見的行數處理
  const visablePartOneText =
    lines.length - maxLines > 0
      ? lines.slice(0, maxLines).join('<br />')
      : text || ''

  // part2 可見的行數處理
  const isMoreDataInfo = lines.length - maxLines * 2 > 0
  const visablePartTwoText = isMoreDataInfo
    ? lines.slice(maxLines, maxLines * 2).join('<br />')
    : lines.slice(maxLines).join('<br />')

  // 當點擊查看更多時
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box {...boxProps}>
      <Flex
        direction={'column'}
        className="show-border"
        borderRadius={'lg'}
        padding={2}
      >
        <Text
          lineHeight={1.75}
          noOfLines={isExpanded ? maxLines : lines.length}
          dangerouslySetInnerHTML={{ __html: visablePartOneText }}
        ></Text>
        {lines.length > maxLines && (
          <Box textAlign={'right'}>
            {isExpanded ? (
              <ChevronUpIcon boxSize={8} onClick={handleExpandClick} />
            ) : (
              <ChevronDownIcon boxSize={8} onClick={handleExpandClick} />
            )}
          </Box>
        )}
        {isExpanded && (
          <Text
            lineHeight={1.75}
            noOfLines={isMoreDataInfo ? undefined : maxLines}
            dangerouslySetInnerHTML={{ __html: visablePartTwoText }}
          ></Text>
        )}
        {isExpanded && isMoreDataInfo && (
          <Button mt={2} variant={'gray'} onClick={onOpen}>
            查看更多
          </Button>
        )}

        {/* POPUP 彈窗處理 - 彈出框顯示所有文字 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>完整內容</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{text}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  )
}

export default ExpandableTextCard
