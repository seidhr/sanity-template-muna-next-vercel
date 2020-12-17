export default {
  name: 'toc',
  type: 'document',
  title: 'Innholdsfortegnelse',
  titleEN: 'Table of Contents',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      titleEN: 'Name',
      description: 'Permanent navn på innholdsfortegnelsen (for intern bruk)',
      descriptionEN: 'Permanent name of the table of content (for internal use)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      description: 'Innholdsfortegnelsens navn, brukes som overskrift',
      descriptionEN: '',
      type: 'string',
    },
    {
      name: 'sections',
      title: 'Seksjoner',
      titleEN: 'Sections',
      type: 'array',
      of: [{ type: 'tocSection' }],
    },
  ],
};
