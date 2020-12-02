import {imageBuilder} from '../lib/sanity'
import {Image} from '@chakra-ui/react'

export default function ItemImage({label, url, id}) {
  return (
    <Image src={imageBuilder.image(url).fit('crop').width('400').height('400').url()} alt={label} />
  )
}
