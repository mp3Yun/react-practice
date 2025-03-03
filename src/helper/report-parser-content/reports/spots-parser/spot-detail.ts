import BasicDataset from '../basic-dataset'

export default class SpotDetail extends BasicDataset<SpotDetail> {
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
  /** 開放日期 */
  openDate: string = ''
  /** 開放時間 */
  openingHours: string = ''
  /** 地點 */
  location: string = ''
  /** 交通 */
  transportation: string = ''
  /** 通勤時間 */
  commuteTime?: string
  /** 預計停留時間 */
  estimatedStayTime?: string
  /** 秀一波-圖1 */
  image1?: string
  /** 秀一波-圖2 */
  image2?: string
  /** 喜歡 */
  isLike: string = 'N'
}
