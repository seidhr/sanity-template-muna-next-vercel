/* 
  Subclass of D1 Digital Object
*/

export default {
  name: 'digitalImageObject',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    metadata: ['exif', 'location', 'lqip', 'palette'],
  },
  fields: [
    {
      name: 'caption',
      title: 'Bildetekst',
      titleEN: 'Caption',
      type: 'localeString',
    },
    {
      name: 'alt',
      title: 'Alternative tekst',
      titleEN: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      type: 'localeString',
      validation: (Rule) => Rule.warning('You should to fill out the alternative text.'),
      options: {
        isHighlighted: true,
      },
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
}
