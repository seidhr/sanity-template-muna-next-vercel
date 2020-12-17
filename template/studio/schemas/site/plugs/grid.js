import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

const Preview = ({value: {blocks}}) => <BlockContent blocks={blocks} />

export default {
  type: 'object',
  name: 'grid',
  title: 'Rutenett',
  titleEN: 'Grid',
  preview: {
    select: {
      blocks: 'subtitle',
    },
    component: Preview,
  },
  description: 'Et rutenett (grid) med tekstinnhold',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'text',
    },
    {
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      type: 'simpleBlockContent',
    },
    {
      name: 'columns',
      title: 'Kolonner',
      titleEN: 'Columns',
      type: 'string',
      options: {
        list: [
          {
            title: '1 kolonne',
            value: 'max1',
          },
          {
            title: '2 kolonner',
            value: 'max2',
          },
          {
            title: '3 kolonner',
            value: 'max3',
          },
        ],
      },
    },
    {
      name: 'items',
      title: 'Blokker',
      titleEN: 'Items',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'content',
              type: 'blockContent',
            },
          ],
        },
      ],
    },
    {
      name: 'anchor',
      title: 'Anker',
      titleEN: 'Anchor',
      description: 'Brukes til å lage en ankerlenke',
      descriptionEN: 'Used for anchor link',
      type: 'string',
    },
  ],
  /* preview: {
    select: {
      title: 'title'
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'Grid'
      }
    }
  } */
}
