import React from 'react'
import PropTypes from 'prop-types'
import { upperFirst } from 'lodash'
import * as DocumentComponents from './Documents'

function resolveDocument(document) {
  const Document = DocumentComponents[upperFirst(document._type)]

  if (Document) {
    return Document
  }

  console.error('Cant find document', document) // eslint-disable-line no-console
  return null
}

function RenderDocument(props) {
  const { document } = props

  if (!document) {
    console.error('Missing document type')
    return <div>Missing document from parent</div>
  }
  const DocumentComponent = resolveDocument(document)

  if (!DocumentComponent) {
    return (
      <div>
        Missing document type: <strong>{document._type}</strong>
      </div>
    )
  } else {
    return <DocumentComponent {...document} key={document.id} />
  }
}

RenderDocument.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      document: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderDocument
