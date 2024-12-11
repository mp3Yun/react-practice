import { Box } from '@chakra-ui/react'
import { useLocation, useParams } from '@tanstack/react-router'
import MovableButton from '../../components/buttons/MovableButton'
import DraggableButton from '../../components/buttons/DraggableButton'

const ButtonIdPage: React.FC = () => {
  // 透過 url 傳參數
  const { postId } = useParams({ strict: false })

  const params = useLocation()
  console.error('99-params', params)

  let context
  let element
  switch (postId) {
    case '1':
      context = '上下移動'
      element = <MovableButton></MovableButton>
      break
    case '2':
      context = '拖動移動'
      element = <DraggableButton></DraggableButton>
      break
    case '3':
      element = <div>Post 789</div>
      break
    default:
      context = '請點擊按鈕'
      element = <div>No post found</div> // 如果沒有匹配的 postId，顯示此內容
  }

  return (
    <div>
      Button 功用:{context}
      <Box>{element}</Box>
    </div>
  )
}

export default ButtonIdPage
