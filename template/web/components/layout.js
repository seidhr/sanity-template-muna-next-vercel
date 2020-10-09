import Alert from './Alert'
import Footer from './Footer'
import Meta from './Meta'

export default function Layout({ alert, preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={alert, preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
