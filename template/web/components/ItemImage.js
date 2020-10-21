import { imageBuilder } from '../lib/sanity'
import { Image } from '@chakra-ui/core'

export default function ItemImage({ label, url, id }) {

  return (
    <Image maxHeight="65vh" m={10} src={imageBuilder.image(url).url()} alt={label || "No label"} />
  )
}
