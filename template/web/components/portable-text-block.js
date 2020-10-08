const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlock(props) {
  const serializers = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      )
    }
  }

  return (
    <BlockContent blocks={props.blocks} serializers={serializers} />
  )
}