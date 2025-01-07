import {
  Box,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { Swiper as SwiperClass } from 'swiper' // 引入 Swiper 類型
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import image1 from '../../assets/images/image1.webp'
import image2 from '../../assets/images/image2.webp'
import 'swiper/css' // 引入 Swiper 的 CSS

interface Props {
  isOpen: boolean
  onClose: () => void
  images?: string[]
}
const AdvertisementModal: React.FC<Props> = ({ isOpen, onClose, images }) => {
  const img = images && images?.length > 0 ? images : [image1, image2]

  const swiperRef = useRef<SwiperClass | null>(null) // 這邊的 instance 很重要

  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={onClose}>
        <Box
          as={DialogContent}
          maxWidth="800px" // 設定最大寬度
          width="90%" // 百分比寬度
          height="500px" // 設定高度
          // sx={{
          //   maxWidth: '800px', // 設定最大寬度
          //   width: '90%', // 百分比寬度
          //   height: '500px', // 設定高度
          // }}
        >
          <DialogHeader>廣告</DialogHeader>
          <DialogCloseTrigger></DialogCloseTrigger>
          <DialogBody>
            <Swiper
              className="custom-swiper"
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              loop // 啟用無限循環
              autoplay={{
                delay: 2500, // 每 2500 毫秒切換一次
                disableOnInteraction: false, // 讓用戶互動後不會停止自動輪播
              }}
              style={{
                width: '600px',
                height: '400px',
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => {
                swiperRef.current = swiper // 綁定 Swiper 實例
                console.log(swiper)
              }}
            >
              {img.map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={item}
                      alt={`Image ${index}`}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </DialogBody>
        </Box>
      </DialogRoot>
    </>
  )
}

export default AdvertisementModal
