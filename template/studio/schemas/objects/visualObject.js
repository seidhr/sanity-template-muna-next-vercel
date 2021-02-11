import {digitallyShownBy, label, represents, referredToBy} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  name: 'visualObject',
  title: 'Visuelt objekt',
  titleEN: 'Visual object',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [represents, label, digitallyShownBy, referredToBy],
  preview: {
    select: {
      title: 'label.nor',
      media: 'digitallyShownBy.0',
    },
    prepare(selection) {
      const {title, media} = selection

      return {
        title: title,
        media: media,
      }
    },
  },
}
