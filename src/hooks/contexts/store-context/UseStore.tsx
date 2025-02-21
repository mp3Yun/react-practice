import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TourDetailValue } from '../../../feature/xlsx/components/tourist-spots/TouristSpotItem'

// 資料結構介面定義
interface StoreDataByFeature {
  xlsx: {
    tours: TourDetailValue[]
  }
}

const StoreContext = createContext<{
  storeData: Partial<StoreDataByFeature> | null
  setStoreData: React.Dispatch<
    React.SetStateAction<Partial<StoreDataByFeature>>
  >
}>({
  storeData: {},
  setStoreData: () => {},
})

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeData, setStoreData] = useState<Partial<StoreDataByFeature>>({})
  useEffect(() => {}, [storeData]) // 這裡的依賴是 storeData，所以每當 storeData 更新時，useEffect 都會被調用

  return (
    <StoreContext.Provider value={{ storeData, setStoreData }}>
      {children}
    </StoreContext.Provider>
  )
}

// 使用 StoreContext hook
export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
