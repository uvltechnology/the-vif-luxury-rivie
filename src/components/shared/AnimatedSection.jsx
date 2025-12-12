import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
  fade: { opacity: 0 }
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  threshold = 0.1
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={directionVariants[direction]}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
