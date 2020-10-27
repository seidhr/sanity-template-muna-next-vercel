import client, { previewClient } from '../../../lib/sanity'
const getClient = (preview) => (preview ? previewClient : client)

async function constructManifest(object) {
  const imageId = object[0].mainRepresentation.iiifImage.url.replace("production", "production/iiif")

  let manifest = `{
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://example.org/iiif/${object[0]._id}/manifest",
    "type": "Manifest",
    "label": { "en": [ "${object[0].label}" ] },
    "provider": [
      {
        "id": "https://www.uib.no/ub",
        "type": "Agent",
        "label": { 
          "no": [ "Universitetsbiblioteket i Bergen" ],
          "en": [ "University of Bergen Library" ] 
        },
        "homepage": [
          {
            "id": "https://www.uib.no/ub",
            "type": "Text",
            "label": { 
              "no": [ "Universitetsbiblioteket i Bergen hjemmeside" ],
              "en": [ "University of Bergen Library Homepage" ] 
            },
            "format": "text/html"
          }
        ],
        "logo": [
          {
            "id": "http://marcus.uib.no/img/UiBmerke_grayscale.svg",
            "type": "Image",
            "format": "image/svg+xml"
          }
        ]
      }
    ],
    "rights": "https://creativecommons.org/licenses/by/4.0/",
    "requiredStatement": {
      "label": { 
        "no": [ "Kreditering" ],
        "en": [ "Attribution" ] 
      },
      "value": { 
        "no": [ "Tilgjengeliggjort av Universitetsbiblioteket i Bergen" ],
        "en": [ "Provided by University of Bergen Library" ] 
      }
    },
    "items": [
      {
        "id": "https://example.org/iiif/${object[0]._id}/canvas/1",
        "type": "Canvas",
        "label": {
          "none": [ "1" ]
        },
        "width": 6099,
        "height": 8599,
        "items": [
          {
            "id": "https://example.org/iiif/${object[0]._id}/page/1",
            "type": "AnnotationPage",
            "items": [
              {
                "id": "https://example.org/iiif/${object[0]._id}/annotation/p1",
                "type": "Annotation",
                "motivation": "painting",
                "target": "https://example.org/iiif/${object[0]._id}/canvas/1",
                "body": {
                  "id": "${imageId}",
                  "type": "Image",
                  "format": "image/jpeg",
                  "service": {
                    "id": "${imageId}",
                    "type": "ImageService2",
                    "profile": "level2"
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    "structures": [
      {
        "id": "https://example.org/iiif/${object[0]._id}/seq/s1",
        "type": "Range",
        "label": {
          "en": [ "Table of contents" ]
        },
        "items": [
          {
            "type": "Canvas",
            "id": "https://example.org/iiif/${object[0]._id}/canvas/1"
          }
        ]
      }
    ]
  }`
  return manifest
}

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  const preview = false

  async function getObject(id, preview = false) {
    const results = await getClient(preview)
      .fetch(`*[_id == $id] {
        _id,
        label,
        mainRepresentation {
          ...,
          "iiifImage": asset-> {
            url
          }
        }
      }`,
      { id })
    return results
  }

  switch (method) {
    case 'GET':
      const results = getObject(id, preview)
      const object = await results

      const constructedManifest = constructManifest(object)

      const manifest = await constructedManifest

      console.log("Manfest served:" + object[0]._id)
      res.status(200).json(manifest)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}