export default {
  title: 'Text',
  name: 'sectionText',
  type: 'object',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
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
        subtitle: 'Text',
      }
    },
  },
}
