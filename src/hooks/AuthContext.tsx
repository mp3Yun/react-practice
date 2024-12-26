import { createContext, PropsWithChildren, useContext, useState } from 'react'

// 定義用戶資訊的資料結構
interface UserInfo {
  id: string
  username: string
  email?: string
}

interface AuthContextProps {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  userInfo?: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
