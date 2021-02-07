import '../styles/index.css'
import {ChakraProvider} from '@chakra-ui/react'
import { Global } from '@emotion/react'
import theme from '../theme'
import fonts from '../styles/font-face'

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={fonts}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
