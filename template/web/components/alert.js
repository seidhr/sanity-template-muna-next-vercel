import Container from './container'
import cn from 'classnames'
import PortableTextBlock from '../components/portable-text-block'

export default function Alert({ alert, preview }) {
  if(!alert) {
    return null
  }

  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              {alert?.item?.content}
            </>
          ) : (
            <>
              <PortableTextBlock blocks={alert?.item?.content} />
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
