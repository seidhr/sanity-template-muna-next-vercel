export default {
  type: 'object',
  name: 'pageHeader',
  title: 'Sideoverskrift',
  titleEN: 'Page Header',
  fieldsets: [
    {
      name: 'subtitle',
      title: 'Undertittel',
      options: {collapsible: true, collapsed: true},
    },
  ],
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
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      fieldset: 'subtitle',
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
