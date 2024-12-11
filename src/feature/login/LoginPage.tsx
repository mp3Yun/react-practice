import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from '@tanstack/react-router'

const LoginPage: React.FC = () => {
  const router = useRouter()
  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Text fontSize={'3xl'}>practice-chakra</Text>
      <Button
        mt={4}
        onClick={() => {
          router.navigate({
            to: '/home',
          })
        }}
      >
        start
      </Button>
    </Flex>
  )
}

export default LoginPage
