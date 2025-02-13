import { motion } from 'framer-motion'

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      style={{
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderLeftColor: '#3498db',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
      }}
    />
  )
}

export default LoadingSpinner
