import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

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
