import { imageBuilder } from '../lib/sanity'
import { Image } from '@chakra-ui/core'

export default function ItemImage({ label, url }) {

  return (
    <Image src={imageBuilder.image(url).url()} alt={label || "No label"} />
  )
}
