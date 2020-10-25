import client, { previewClient } from '../../../lib/sanity'
const getClient = (preview) => (preview ? previewClient : client)

async function constructManifest(object) {
  const imageId = object[0].mainRepresentation.iiifImage.url.replace("production", "production/iiif")

  let manifest = `{
    "@context": "http://iiif.io/api/presentation/2/context.json",
    "id": "https://example.org/iiif/${object[0]._id}/manifest",
    "type": "Manifest",
    "label": { "en": [ "${object[0].label}" ] },
    "sequences": [
      {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "https://example.org/iiif/${object[0]._id}/seq/s1",
        "@type": "sc:Sequence",
        "canvases": [
          {
            "@type": "sc:Canvas",
            "@id": "https://example.org/iiif/${object[0]._id}/canvas/1",
            "label": "1",
            "width": 6099,
            "height": 8599,
            "images": [
              {
                "@type": "oa:Annotation",
                "motivation": "sc:painting",
                "on": "https://example.org/iiif/${object[0]._id}/canvas/1",
                "resource": {
                  "@type": "dctypes:Image",
                  "@id": "${imageId}",
                  "service": {
                    "@context":  "http://iiif.io/api/image/2/context.json",
                    "@id": "${imageId}",
                    "profile": "http://iiif.io/api/image/2/level2.json"
                  }
                }
              }
            ]
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