export default {
  name: 'singleObject',
  title: 'Single object',
  type: 'object',
  fields: [
    {
      name: 'item',
      type: 'reference',
      to: [{ type: 'madeObject' }],
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'item.label',
      media: 'item.mainRepresentation',
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: 'Single Object',
        media: media,
      }
    },
  },
}
