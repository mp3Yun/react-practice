import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import LeaveWarningModal from '../components/modals/LeaveWarningModal'
import { useDirtyForm } from '../hooks/DirtyFormContext'

const FormGuard: React.FC = () => {
  const { isDirty, setIsDirty } = useDirtyForm()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nextLocation, setNextLocation] = useState<string | null>(null)

  useEffect(() => {
    console.error('99-isDirty=>', isDirty)
    // TODO: 路由變化後，沒有被 trigger
    const unsubscribe = router.subscribe('onBeforeNavigate', (event) => {
      console.error('99-我的路由 event=>', event)
      if (isDirty) {
        setIsModalOpen(true)
      }
    })

    return () => unsubscribe()
  }, [isDirty, router])

  return (
    <>
      {isDirty && (
        <LeaveWarningModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setNextLocation(null) // 重置導航位置
          }}
          onCheck={() => {
            setIsModalOpen(false)
            if (nextLocation) {
              router.navigate({ to: nextLocation })
              setNextLocation(null) // 清除暫存的導航位置
            }
          }}
        ></LeaveWarningModal>
      )}
    </>
  )
}

export default FormGuard
