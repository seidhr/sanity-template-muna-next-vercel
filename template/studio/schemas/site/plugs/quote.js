export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'content',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'Quote',
      }
    },
  },
}
