import { Spinner } from '@chakra-ui/react'
import { SpinnerProps } from '../../interface'
import './index.css'

const Appspinner: React.FC<SpinnerProps> = ({
  thickness,
  color,
  emptyColor,
  size,
  speed,
}) => {
  return (
    <Spinner
      thickness={thickness}
      color={color}
      emptyColor={emptyColor}
      size={size}
      speed={speed}
    />
  )
}

export default Appspinner
