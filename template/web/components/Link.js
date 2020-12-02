import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as NextLink} from 'next/link'

export default function Link({href, children}) {
  if (!href) {
    return null
  }

  return (
    <ChakraLink as={NextLink} href={href}>
      {children}
    </ChakraLink>
  )
}
