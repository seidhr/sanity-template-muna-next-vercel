import {nanoid} from 'nanoid'

export default function getDocument (item, types) {
  const doc = {
    _type: 'madeObject',
    _id: `${item.identifier}`,
    accessState: 'open',
    editorialState: 'published',
    // license: item.accessInfo && item.accessInfo.isPublicDomain ? 'https://creativecommons.org/publicdomain/mark/1.0/' : 'https://rightsstatements.org/vocab/CNE/1.0/',
    label: item.title,
    preferredIdentifier: item.identifier,
    identifiedBy: [
      {
        _type: 'identifier',
        _key: nanoid(),
        content: item.identifier,
        hasType: {
          _type: 'reference',
          _key: nanoid(),
          _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728'
        }
      }
    ],
    hasCurrentOwner: [
      {
        _type: 'reference',
        _key: nanoid(),
        _ref: '782c5364-7324-4f16-b5af-2c60b73fc707'
      }
    ],
    /* subjectOfManifest: item._links.presentation.href, */
    ...(types.length > 0 && {hasType: types}),
    wasOutputOf: [
      {
        _type: 'dataTransferEvent',
        _key: nanoid(),
        _id: nanoid(36),
        transferred: {
          _type: 'digitalObject',
          _key: nanoid(),
          _id: item.id,
          value: `"${JSON.stringify(item, null, 0)}"`
        },
        date: new Date(),
        hasSender: {
          _type: 'digitalDevice',
          _key: nanoid(),
          _id: nanoid(36),
          label: 'sparql.ub.uib.no'
        }
      }
    ]
  }
  return doc
}
