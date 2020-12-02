import Document, {Html, Head, Main, NextScript} from 'next/document'
import {ColorModeScript} from '@chakra-ui/react'

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
