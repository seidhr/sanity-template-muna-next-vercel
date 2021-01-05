export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'label',
      title: 'Merkelapp',
      titleEN: 'Label',
      description: 'Brukes over tittelen',
      descriptionEN: 'Used above the title',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      titleEN: 'Tagline',
      description: 'Tagline under tittelen. Bør ikke være lengre en to korte avsnitt.',
      descriptionEN: 'Tagline under the title. Should not be longer than two short paragraphs.',
      type: 'blockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      description: 'Bakgrunnsbilde under teksten',
      descriptionEN: 'Illustration below the text',
      type: 'illustration',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      disabled: 'disabled',
    },
    prepare({title, disabled}) {
      return {
        title: `${disabled ? 'Avslått' : title}`,
        subtitle: 'Hero',
      }
    },
  },
}
