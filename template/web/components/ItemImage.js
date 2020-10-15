import { imageBuilder } from '../lib/sanity'
import { Image } from '@chakra-ui/core'

export default function ItemImage({ label, url, id }) {

  return (
    <Image maxHeight="80vh" m={10} src={imageBuilder.image(url).url()} alt={label || "No label"} />
  )
}
