export default {
  name: 'singleObject',
  title: 'Single object',
  type: 'object',
  fields: [
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{type: 'madeObject'}],
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'item.label',
      media: 'item.mainRepresentation',
    },
    prepare({title, media}) {
      return {
        title: title,
        subtitle: 'Single Object',
        media: media,
      }
    },
  },
}
