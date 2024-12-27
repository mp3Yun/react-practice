import { useEffect, useState } from 'react'
import LeaveWarningModal from '../components/modals/LeaveWarningModal'

interface Props {
  isDirty: boolean
  onCheck: () => void
}
const FormGuard: React.FC<Props> = ({ isDirty, onCheck }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isDirty) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [isDirty])

  return (
    <>
      {isDirty && (
        <LeaveWarningModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onCheck={() => {
            onCheck()
            setIsModalOpen(false)
          }}
        ></LeaveWarningModal>
      )}
    </>
  )
}

export default FormGuard
