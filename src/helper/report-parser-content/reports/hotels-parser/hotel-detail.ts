import BasicDataset from '../basic-dataset'

export default class HotelDetail extends BasicDataset<HotelDetail> {
  /** 唯一值 */
  id: number = 0
  /** 景點名稱 */
  name: string = ''
  /** 資訊介紹 */
  info: string = ''
  /** 特色 */
  special: string = ''
  /** 價格 */
  price: number = 0
  /** 入住時間 */
  checkinTime: string = ''
  /** 退房時間 */
  checkoutTime: string = ''
  /** 地點 */
  location: string = ''
  /** 交通資訊 */
  transportation: string = ''
  /** 喜歡 */
  isLike: string = 'N'
}
