import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Container, Heading } from '@chakra-ui/core'
import ItemImage from '../ItemImage'
import PortableTextBlock from '../PortableTextBlock'

/* const MiradorWithNoSSR = dynamic(
  () => import('../../components/mirador'),
  { ssr: false }
) */

export default function Actor(item) {
  return (
    <Container maxW="xl" centerContent>
      <Heading>
        {item.label}
      </Heading>

      {item.mainRepresentation && (
        <ItemImage 
          id={item.id} 
          label={item.label}
          url={item.mainRepresentation} />
      )}

      {/* <MiradorWithNoSSR manifestData={item.mainRepresentation}/> */}
      <Box maxW="lg">
        {item?.referredToBy?.map(ref => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
      {item.hasMember && item.hasMember.map(member => (
        <Link href={member.id}><a>{member.label}</a></Link>
      ))}
    </Container>
  )
}
