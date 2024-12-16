import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Center, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useState } from 'react'
import NestedComponent from '../../components/NestedComponent'

const CarouselPage: React.FC = () => {
  const imageList = [
    'https://bit.ly/dan-abramov',
    'https://i.imgur.com/MK3eW3As.jpg',
    'https://i.imgur.com/QIrZWGIs.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goNext = () => {
    // TODO: 好像有點怪怪的
    setCurrentIndex((prev) => (prev + 1) % imageList.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1) % imageList.length)
  }

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
