import {nanoid} from 'nanoid'
import {parse} from 'date-fns'
import {mapLicenses} from './mapLicenses'

export default function getDocument(item, types, assetID) {
  const parseDate = (date) => {
    if (!date) {
      return null
    }
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return parsedDate
  }

  const subject = item.subject
    ? [
        ...item.subject.map((s) => {
          return {
            _type: 'concept',
            _id: s.identifier,
            _rev: nanoid(),
            accessState: 'open',
            editorialState: 'published',
            label: {
              _type: 'localeString',
              nor: s.prefLabel,
            },
          }
        }),
      ]
    : []

  const maker = item.maker
    ? [
        ...item.maker.map((s) => {
          return {
            _type: 'actor',
            _id: s.identifier,
            _rev: nanoid(),
            accessState: 'open',
            editorialState: 'published',
            label: s.name,
          }
        }),
      ]
    : []

  const depicts = item.depicts
    ? [
        ...item.depicts.map((s) => {
          return {
            _type: 'actor',
            _id: s.identifier,
            _rev: nanoid(),
            accessState: 'open',
            editorialState: 'published',
            label: s.name,
          }
        }),
      ]
    : []

  const activityStream = [
    {
      _key: nanoid(),
      _type: 'production',
      ...(item.maker && {
        carriedOutBy: [
          ...item.maker.map((s) => {
            return {
              _key: nanoid(),
              _type: 'actorInRole',
              actor: {
                _ref: s.identifier,
                _type: 'reference',
              },
            }
          }),
        ],
      }),
      ...((item.created || item.madeAfter || item.madeBefore) && {
        timespan: [
          {
            _key: nanoid(),
            _type: 'timespan',
            ...(item.madeAfter?.value ? {beginOfTheBegin: parseDate(item.madeAfter?.value)} : ''),
            ...(item.madeBefore?.value ? {endOfTheEnd: parseDate(item.madeBefore?.value)} : ''),
            ...(item.created?.value ? {date: parseDate(item.created?.value)} : ''),
          },
        ],
      }),
    },
  ]

  const doc = [
    ...subject,
    ...maker,
    ...depicts,
    {
      _type: 'madeObject',
      _id: `${item.identifier}`,
      accessState: 'open',
      editorialState: 'published',
      label: item.title,
      preferredIdentifier: item.identifier,
      subjectOfManifest: `https://marcus-manifest-api.vercel.app/api/iiif/manifest/${item.identifier}`,
      identifiedBy: [
        {
          _type: 'identifier',
          _key: nanoid(),
          content: item.identifier,
          hasType: {
            _type: 'reference',
            _key: nanoid(),
            _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728',
          },
        },
      ],
      license: mapLicenses(item.license),
      mainRepresentation: {
        _type: 'mainRepresentation',
        asset: {
          _type: 'reference',
          _ref: assetID,
        },
      },
      ...(Object.keys(activityStream[0]).length > 2 && {
        activityStream,
      }),
      ...(item.description && {
        ...{
          referredToBy: [
            {
              _key: nanoid(),
              _type: 'linguisticObject',
              accessState: 'open',
              editorialState: 'published',
              body: [
                {
                  _type: 'block',
                  _key: nanoid(),
                  style: 'normal',
                  markDefs: [],
                  children: [
                    {
                      _type: 'span',
                      _key: nanoid(),
                      text: item.description,
                      marks: [],
                    },
                  ],
                },
              ],
              hasType: [
                {
                  _key: nanoid(),
                  _ref: 'cad752ea-0888-415a-a691-9d5b92577389',
                  _type: 'reference',
                },
              ],
              language: {
                _ref: 'e81f617f-b767-4e7c-8495-93b745f47aa0',
                _type: 'reference',
              },
            },
          ],
        },
      }),
      ...(item.subject && {
        subject: [
          ...item.subject.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      ...(item.depicts && {
        depicts: [
          ...item.depicts.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      hasCurrentOwner: [
        {
          _type: 'reference',
          _key: nanoid(),
          _ref: '782c5364-7324-4f16-b5af-2c60b73fc707',
        },
      ],
      ...(types.length > 0 && {hasType: types}),
      wasOutputOf: {
        _type: 'dataTransferEvent',
        _key: nanoid(),
        /* _id: nanoid(36), <- Insert if this is to be changed to a reference */
        transferred: {
          _type: 'digitalObject',
          _key: nanoid(),
          /* _id: item.id, */
          value: `"${JSON.stringify(item, null, 0)}"`,
        },
        timestamp: new Date(),
        hasSender: {
          _type: 'digitalDevice',
          _key: nanoid(),
          /* _id: nanoid(36), */
          label: 'sparql.ub.uib.no',
        },
      },
    },
  ]
  console.log(doc)
  return doc.filter(Boolean)
}
