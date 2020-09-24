import cn from 'classnames'
import { imageBuilder } from '../lib/sanity'

export default function ItemImage({ label, url, id }) {
  const image = (
    <img
      width={1000}
      height={500}
      alt={`Cover Image for ${label}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': id,
      })}
      src={imageBuilder.image(url).height(500).width(1000).url()}
    />
  )

  return (
    <div className="sm:mx-0">
        {image}
    </div>
  )
}
