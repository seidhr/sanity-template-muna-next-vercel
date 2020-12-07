import {Link as NextLink} from 'next/link'
import {Link, Text} from '@chakra-ui/react'

const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlock(props) {
  if (!props.blocks) {
    return null
  }

  const {fontSize, fontWeight, my} = props

  const BlockRenderer = (props) => {
    const {style = 'normal'} = props.node

    if (/^h\d/.test(style)) {
      const level = style.replace(/[^\d]/g, '')
      return React.createElement(style, {className: `heading-${level}`}, props.children)
    }

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>
    }

    return (
      <Text fontSize={fontSize} fontWeight={fontWeight} my={my}>
        {props.children}
      </Text>
    )
    // Fall back to default handling
    // return BlockContent.defaultSerializers.types.block(props)
  }

  const serializers = {
    marks: {
      internalLink: ({mark, children}) => {
        const {reference} = mark
        const href = `/id/${reference._ref}`
        return (
          <Link as={NextLink} href={href}>
            {children}
          </Link>
        )
      },
      link: ({mark, children}) => {
        // Read https://css-tricks.com/use-target_blank/
        const {blank, href} = mark
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
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      block: BlockRenderer,
    },
  }

  return <BlockContent blocks={props.blocks} serializers={serializers} />
}
