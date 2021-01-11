export default {
  type: 'object',
  name: 'pageHeader',
  title: 'Sideoverskrift',
  titleEN: 'Page Header',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      type: 'simpleBlockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjon',
      titleEN: 'Illustration',
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
        subtitle: 'Sideoverskrift',
        media: illustration?.image,
      }
    },
  },
}
