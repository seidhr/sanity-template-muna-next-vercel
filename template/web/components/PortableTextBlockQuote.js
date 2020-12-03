import { Link as NextLink } from 'next/link'
import { Link, Text } from '@chakra-ui/react'

const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlockQuote(props) {
  if (!props.blocks) {
    return null
  }

  const { fontSize, fontWeight } = props

  const BlockRenderer = (props) => {
    const { style = 'normal' } = props.node

    return (
      <Text as="blockquote" fontSize={fontSize} fontWeight={fontWeight}>
        {props.children}
      </Text>
    )
    // Fall back to default handling
    // return BlockContent.defaultSerializers.types.block(props)
  }

  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => {
        const { reference } = mark
        const href = `/id/${reference._ref}`
        return (
          <Link as={NextLink} href={href}>
            {children}
          </Link>
        )
      },
      link: ({ mark, children }) => {
        // Read https://css-tricks.com/use-target_blank/
        const { blank, href } = mark
        return blank ? (
          <Link as={NextLink} href={href} isExternal>
            {children}
          </Link>
        ) : (
            <Link as={NextLink} href={href} isExternal>
              {children}
            </Link>
          )
      },
    },
    types: {
      block: BlockRenderer,
    },
  }

  return <BlockContent blocks={props.blocks} serializers={serializers} />
}
