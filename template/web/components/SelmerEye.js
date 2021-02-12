import { Box } from '@chakra-ui/react'
import SvgEye from './selmer-eye.svg'

export default function SelmerEye() {
/*   const eye = document.querySelector('#pupil');
  
  window.addEventListener('mousemove', (evt) => {
    const x = -(window.innerWidth / 2 - evt.pageX) / 10;
    const y = -(window.innerHeight / 2 - evt.pageY) / 10;
    eye.style.transform = `translateY(${y}px) translateX(${x}px)`;
  });   */
  
  return (
    <Box w="40px">
      <SvgEye />
    </Box>
  )
}
