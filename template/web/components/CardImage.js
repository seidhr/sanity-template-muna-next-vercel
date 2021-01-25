import {imageBuilder} from '../lib/sanity'
import {Image} from '@chakra-ui/react'

export default function ItemImage({label, url, id}) {
  return (
    <Image src={imageBuilder.image(url).fit('fillmax').width(500).url()} alt={label} objectFit="cover"/>
  )
}
