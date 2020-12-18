import {language} from '../props'

export default {
  type: 'document',
  name: 'navigationMenu',
  title: 'Navigasjons meny',
  title: 'Navigation menu',
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    language,
    {
      type: 'array',
      name: 'items',
      title: 'Menypunkt',
      titleEN: 'Items',
      of: [{type: 'navigationItem'}],
    },
  ],
}
