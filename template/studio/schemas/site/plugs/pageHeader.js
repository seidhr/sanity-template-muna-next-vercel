export default {
  type: 'object',
  name: 'pageHeader',
  title: 'Page Header',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'simpleBlockContent',
    },
    {
      title: 'Illustration',
      name: 'illustration',
      type: 'illustration',
    },
  ],
  preview: {
    select: {
      title: 'title',
      illustration: 'illustration',
    },
    prepare({title, illustration}) {
      return {
        title: title,
        subtitle: 'Page header',
        media: illustration.image,
      }
    },
  },
}
