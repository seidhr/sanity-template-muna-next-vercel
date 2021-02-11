import bcp47 from 'bcp47'
import {FaCog} from 'react-icons/fa'

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Nettsideinnstillinger',
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
      name: 'frontpage',
      title: 'Forside',
      titleEN: 'Frontpage',
      type: 'reference',
      to: [
        {type: 'page'}
      ]
    },
    {
      name: 'language',
      title: 'Hovedspråk',
      titleEN: 'Site language',
      description:
        'Må være en gyldig bcp47 språkkode som en, en-US, no eller nb-NO',
      descriptionEN:
        'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      type: 'string',
      validation: Rule =>
        Rule.custom(lang =>
          bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'
        ),
    },
    {
      name: 'logo',
      title: 'Logo',
      description:
        'Bruk helst en SVG hvor fargen er satt med currentColor',
      descriptionEN:
        'Best choice is to use an SVG where the color are set with currentColor',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: 'mainNavigation',
      title: 'Main navigation',
      description: 'Select main navigation for the top menu',
      type: 'reference',
      to: [{type: 'navigationMenu'}],
    },
    {
      name: 'footer',
      title: 'Footer page',
      description: 'Select page for the footer',
      type: 'reference',
      to: [{type: 'page'}],
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
