import { Box, Dialog, DialogContent, DialogRoot } from '@chakra-ui/react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { PropsWithChildren } from 'react'
import { useStore } from '../../../../hooks/contexts/store-context/UseStore'

interface Props extends PropsWithChildren {
  itemInfo: ItemInfo
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

const DetailTripCard: React.FC<Props> = ({
  itemInfo,
  isOpen,
  onConfirm,
  onClose,
}) => {
  // TODO:
  const category = itemInfo.id.split('-')[0]
  const oriId = itemInfo.origId
  const { storeData } = useStore()

  // 1. print pdf
  // 2. get data for useStore

  return (
    <>
      <DialogRoot
        open={isOpen}
        onOpenChange={onClose}
        motionPreset="slide-in-bottom"
      >
        <DialogContent>
          <Box>{'detail area '}</Box>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default DetailTripCard
