import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Center, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import NestedComponent from '../../components/NestedComponent'
import { useTimer } from 'react-timer-hook'

const CarouselPage: React.FC = () => {
  const imageList = [
    'https://bit.ly/dan-abramov',
    'https://i.imgur.com/MK3eW3As.jpg',
    'https://i.imgur.com/QIrZWGIs.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  // 初始化逾期時間
  const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
    const newExpiryTimestamp = new Date()
    newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + 5) // 5 seconds
    return newExpiryTimestamp
  })

  const { restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log('onExpire triggered')
      goNext()
    },
  })

  const goNext = () => {
    console.log('goNext', expiryTimestamp)
    setCurrentIndex((prev) => (prev + 1) % imageList.length)
    const timestamp = new Date()
    timestamp.setSeconds(timestamp.getSeconds() + 5)
    setExpiryTimestamp(timestamp)
    restart(timestamp) // not work
  }

  const goPrev = () => {
    console.log('goPrev', expiryTimestamp)
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
    const timestamp = new Date()
    timestamp.setSeconds(timestamp.getSeconds() + 5)
    setExpiryTimestamp(timestamp)
    restart(timestamp) // not work
  }

  // work
  // useEffect(() => {
  //   restart(expiryTimestamp)
  // }, [expiryTimestamp])

  return (
    <Flex>
      <NestedComponent title="Carousel page">
        <Flex mt={4} direction="row" height="65vh" width="75vw" align="center">
          <Center flex="10%" height="100%">
            <ChevronLeftIcon boxSize={8} onClick={goPrev}></ChevronLeftIcon>
          </Center>
          <Center flex="80%" height="100%" width="100%" justifyContent="center">
            <Image
              justifyContent="center"
              objectFit="cover"
              src={imageList[currentIndex]}
            />
          </Center>
          <Center flex="10%" height="100%">
            <ChevronRightIcon boxSize={8} onClick={goNext}></ChevronRightIcon>
          </Center>
        </Flex>
      </NestedComponent>
    </Flex>
  )
}

export default CarouselPage
