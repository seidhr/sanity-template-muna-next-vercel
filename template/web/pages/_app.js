import '../styles/index.css'
import { ChakraProvider } from "@chakra-ui/core"
// import customTheme from "./theme"


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
