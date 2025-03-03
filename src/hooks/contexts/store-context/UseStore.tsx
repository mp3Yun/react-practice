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

const LOCAL_STORAGE_KEY = 'storeData'

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeData, setStoreData] = useState<Partial<StoreDataByFeature>>(
    () => {
      try {
        const storeData = localStorage.getItem(LOCAL_STORAGE_KEY)
        return storeData ? JSON.parse(storeData) : {}
      } catch (error) {
        console.error('Failed to load store data from local storage', error)
        return {}
      }
    }
  )
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storeData))
    } catch (error) {
      console.error('Failed to save store data to local storage', error)
    }
  }, [storeData]) // 這裡的依賴是 storeData，所以每當 storeData 更新時，useEffect 都會被調用

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
