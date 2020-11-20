import {Link as NextLink} from 'next/link'
import {Link} from '@chakra-ui/core'
const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlock(props) {
  if (!props.blocks) {
    return null
  }

  const serializers = {
    marks: {
      internalLink: ({mark, children}) => {
        const {slug = {}} = mark
        const href = `/${slug.current}`
        return (
          <Link as={NextLink} href={href}>
            <a>{children}</a>
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
    },
  }

  return <BlockContent blocks={props.blocks} serializers={serializers} />
}
