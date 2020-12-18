import {timespan, referredToBy} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  name: 'name',
  title: 'Navn',
  titleEN: 'Name',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'content',
      title: 'Navn',
      titleEN: 'Name',
      type: 'string',
    },
    {
      name: 'hasType',
      title: 'Type',
      titleEN: 'Type',
      type: 'reference',
      to: [{type: 'appelationType'}],
    },
    {
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'language'}]}],
    },
    timespan,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'content',
      type: 'hasType.label.nor',
      lang: 'language.0.label.nor',
    },
    prepare(selection) {
      const {title, type, lang} = selection
      return {
        title: title,
        subtitle: `${type} ${lang ? 'på ' + lang : ''}`,
      }
    },
  },
}
