import client from 'part:@sanity/base/client'
import {MdLink} from 'react-icons/md'

function myAsyncSlugifier(input) {
  const query = '*[_id == $id][0]'
  const params = {id: input._ref}
  return client.fetch(query, params).then((doc) => {
    return doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
  })
}

export default {
  name: 'route',
  type: 'document',
  title: 'Sti',
  titleEN: 'Landing page routes',
  icon: MdLink,
  initialValue: {
    useSiteTitle: false,
  },
  fieldsets: [
    {
      title: 'Visibility',
      name: 'visibility',
    },
  ],
  fields: [
    {
      name: 'page',
      title: 'Side',
      titleEN: 'Page',
      description: 'Siden du vil at skal vises på denne adressen. Siden må være publisert.',
      descriptionEN: 'The page you want to appear at this path. Remember it needs to be published.',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      name: 'slug',
      title: 'Sti',
      titleEN: 'Path',
      description: 'Dette er adressen siden vil bli tilgjengelig på',
      descriptionEN: 'This is the website path the page will accessible on',
      type: 'slug',
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (slug && slug.current && slug.current === '/') {
            return 'Cannot be /'
          }
          return true
        }),
      options: {
        source: 'page',
        // Read more: https://www.sanity.io/docs/slug-type
        slugify: myAsyncSlugifier,
      },
    },
    {
      name: 'useSiteTitle',
      title: 'Bruk nettsidens tittel?',
      titleEN: 'Use site title?',
      description: 'Bruk nettsidens tittel som sidetittel istedenfor tittelen på siden på denne stien',
      descriptionEN: 'Use the site settings title as page title instead of the title on the referenced page',
      type: 'boolean',
    },
    {
      name: 'openGraph',
      title: 'Open graph',
      titleEN: 'Open graph',
      description: 'Disse vil bli brukt i "meta tags"',
      descriptionEN: 'These values populate meta tags',
      type: 'openGraph',
    },
    {
      name: 'includeInSitemap',
      title: 'Inkluder i sitemap',
      titleEN: 'Include in sitemap',
      description: 'For søkemotorer. Vil bli generert i /sitemap.xml',
      descriptionEN: 'For search engines. Will be generateed to /sitemap.xml',
      fieldset: 'visibility',
      type: 'boolean',
    },
    {
      name: 'disallowRobots',
      title: 'Disallow in robots.txt',
      titleEN: '"Disallow" i robots.txt',
      description: 'Skjul denne stien fra søkemoterer',
      descriptionEN: 'Hide this route for search engines like google',
      fieldset: 'visibility',
      type: 'boolean',
    },
    /*
    // This can be used by a server-side rendered website. We plan to figure out proper JAMstack support
    {
      name: 'queries',
      type: 'array',
      description: 'Used to return personalized content based on paid search terms and remarketing',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      }
    }, */
    /* {
      name: 'campaign',
      type: 'string',
      title: 'Campaign',
      description: 'UTM for campaings',
    }, */
    /*
    // This can be used by a server-side rendered website. We plan to figure out proper JAMstack support
    {
      name: 'experiment',
      type: 'experiment',
      description: 'Use this to A/B/n test this route towards different pages',
    }, */
  ],
  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'page.title',
    },
    prepare({title, subtitle}) {
      return {
        title: ['/', title].join(''),
        subtitle,
      }
    },
  },
}
