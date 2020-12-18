export default {
  name: 'post',
  type: 'document',
  title: 'Blogg innlegg',
  titleEN: 'Blog Post',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      titleEN: 'Slug',
      description: 'En "slug" bruks i sidens nettadresse. Basert på tittel',
      descriptionEN: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'publishedAt',
      title: 'Publikasjonsdato',
      titleEN: 'Published at',
      description: 'Denne datoen kan settes frem i tid for fremtidig publisering på en nettside',
      descriptionEN: 'This can be used to schedule post for publishing',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      type: 'simpleBlockContent',
      title: 'Sammendrag',
      titleEN: 'Excerpt',
      description: 'Brukes på oversiktssider, på Google og på sosiale medier.',
      descriptionEN:
        'This ends up on summary pages, on Google, when people share your post in social media.',
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      titleEN: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      type: 'blockContent',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'actorInRole',
        },
      ],
    },
    {
      name: 'categories',
      title: 'Kategorier',
      titleEN: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'concept',
          },
        },
      ],
    },
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({title = 'No title', publishedAt, slug = {}, media}) {
      const path = `/blog/${slug.current}`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Uten publiseringsdato',
      }
    },
  },
}
