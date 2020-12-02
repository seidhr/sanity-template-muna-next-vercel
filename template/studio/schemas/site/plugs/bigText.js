export default {
  type: 'object',
  name: 'bigText',
  title: 'Big text',
  description: 'A big text. Centered. Keep it short to max 2-3 paragraphs.',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      title: 'Text',
      name: 'content',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      return {
        title: content
          ? content[0].children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        subtitle: 'Big Text',
      }
    },
  },
}
