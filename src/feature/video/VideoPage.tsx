import { AspectRatio, Box } from '@chakra-ui/react'

const VideoPage: React.FC = () => {
  // 全部包好了

  return (
    <div>
      <h1>VideoPage</h1>
      <Box>
        <AspectRatio maxW="560px" ratio={1}>
          <iframe
            title="naruto"
            src="https://www.youtube.com/embed/QhBnZ6NPOY0"
            allowFullScreen
          />
        </AspectRatio>
      </Box>
    </div>
  )
}
export default VideoPage
