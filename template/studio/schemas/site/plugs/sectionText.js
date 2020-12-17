export default {
  title: 'Text',
  name: 'sectionText',
  type: 'object',
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
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      type: 'simpleBlockContent',
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
