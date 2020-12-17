import {FaCog} from 'react-icons/fa'

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Sideinnstillinger',
  titleEN: 'Site Settings',
  icon: FaCog,
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'openGraph',
      title: 'Open graph',
      titleEN: 'Open graph',
      description: 'Disse vil bli brukt i "meta tags" på sider som ikke har egne verdier',
      descriptionEN: 'These will be the default meta tags on all pages that have not set their own',
      type: 'openGraph',
    },
    {
      name: 'keywords',
      title: 'Nøkkelord',
      titleEN: 'Keywords',
      description: 'Legg til nøkkelord som beskriver nettsiden',
      descriptionEN: 'Add keywords that describes your blog',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    /* {
      type: 'color',
      name: 'primaryColor',
      title: 'Primary brand color',
      description: 'Used to generate the primary accent color for websites, press materials, etc',
    },
    {
      type: 'color',
      name: 'secondaryColor',
      title: 'Secondary brand color',
      description: 'Used to generate the secondary accent color for websites, press materials, etc',
    }, */
  ],
}
