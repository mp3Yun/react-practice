import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from '@tanstack/react-router'
import { useAuth } from '../../hooks/AuthContext'

const LoginPage: React.FC = () => {
  const { setIsLogin } = useAuth()
  const router = useRouter()
  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Text fontSize={'3xl'}>Personalized trip schedule</Text>
      <Button
        mt={4}
        onClick={() => {
          setIsLogin(true)
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
