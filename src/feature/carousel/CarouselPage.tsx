import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Center, Flex, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import NestedComponent from '../../components/NestedComponent'

const CarouselPage: React.FC = () => {
  const imageList = [
    'https://bit.ly/dan-abramov',
    'https://i.imgur.com/MK3eW3As.jpg',
    'https://i.imgur.com/QIrZWGIs.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % imageList.length)

  useEffect(() => {
    const interval = setInterval(goToNextImage, 1000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <Flex>
      <NestedComponent title="Carousel page">
        <Flex mt={4} direction="row" height="65vh" width="75vw" align="center">
          <Center flex="10%" height="100%">
            <FaChevronLeft
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + imageList.length) % imageList.length
                )
              }
            ></FaChevronLeft>
          </Center>
          <Center flex="80%" height="100%" width="100%" justifyContent="center">
            <Image
              justifyContent="center"
              objectFit="cover"
              src={imageList[currentIndex]}
            />
          </Center>
          <Center flex="10%" height="100%">
            <FaChevronRight onClick={goToNextImage}></FaChevronRight>
          </Center>
        </Flex>
      </NestedComponent>
    </Flex>
  )
}

export default CarouselPage
