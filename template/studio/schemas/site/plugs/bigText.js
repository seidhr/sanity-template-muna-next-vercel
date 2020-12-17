export default {
  type: 'object',
  name: 'bigText',
  title: 'Stor tekst',
  titleEN: 'Big text',
  description: 'Stor tekst. Centered. Keep it short to max 2-3 paragraphs.',
  descriptionEN: 'A big text. Centered. Keep it short to max 2-3 paragraphs.',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
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
        subtitle: 'Stor tekst',
      }
    },
  },
}
