import React from 'react'
import {
  Box,
  Label,
  Stack
} from '@sanity/ui'

export const QuotePreview = ({value: {content, type}}) => {
  const text = content
    ? content.map((block) => block.children
      .filter((child) => child._type === 'span')
      .map((span, index) => (<p key={index}>{span.text}</p>)))
    : ''

  return (
    <Box paddingTop="2">
      <Stack space="3">
        {type && (<Label size={0}>{type}</Label>)}
      </Stack>
      {text && (<blockquote>{text}</blockquote>)}
    </Box>
  )
}