import Alert from './Alert'
import Footer from './Footer'
import Meta from './Meta'

export default function Layout({alert, preview, children}) {
  return (
    <>
      <Meta />
        <Alert preview={(alert, preview)} />
        <>
          {children}
        </>
      <Footer />
    </>
  )
}
