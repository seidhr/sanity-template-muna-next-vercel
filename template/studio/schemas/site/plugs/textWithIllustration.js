export default {
  type: 'object',
  name: 'textWithIllustration',
  title: 'Text with illustration',
  fields: [
    {
      type: 'boolean',
      name: 'disabled'
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'simpleBlockContent',
      name: 'text',
      title: 'text',
    },
    {
      type: 'illustration',
      name: 'illustration',
      title: 'Illustration'
    }
  ]
}
