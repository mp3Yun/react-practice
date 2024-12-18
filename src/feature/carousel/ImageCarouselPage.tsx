import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// 一定要載入 swiper 樣式，否則會跑版
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './imageCarouselSwiper.css' // 確保載入自訂樣式
import NestedComponent from '../../components/NestedComponent'

const ImageCarouselPage: React.FC = () => {
  const imageList = [
    'https://bit.ly/dan-abramov',
    'https://i.imgur.com/MK3eW3As.jpg',
    'https://i.imgur.com/QIrZWGIs.jpg',
  ]

  return (
    <NestedComponent title="swiper 應用">
      <Swiper
        className="custom-swiper"
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        style={{
          width: '600px',
          height: '400px',
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {imageList.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: '100%', height: '100%', alignContent: 'center' }}
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
    </NestedComponent>
  )
}

export default ImageCarouselPage
