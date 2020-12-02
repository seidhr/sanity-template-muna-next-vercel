export default {
  type: 'object',
  name: 'twoColumn',
  title: 'Two column',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'First column',
      name: 'firstColumn',
      type: 'blockContent',
    },
    {
      title: 'Second column',
      name: 'secondColumn',
      type: 'blockContent',
    },
    {
      title: 'Anchor',
      name: 'anchor',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'firstColumn'
    },
    prepare({title, content}) {
      const text = content
        ? content[0].children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
        : ''

      return {
        title: title ? title : text ? text : '',
        subtitle: 'Two column',
      }
    },
  },
}
