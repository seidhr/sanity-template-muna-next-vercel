import client, { previewClient } from './sanity'
const getClient = (preview) => (preview ? previewClient : client)

const publicDocumentTypes = [
  "madeObject",
  "actor",
  "group",
  "concept",
  "objectType",
  "place"
]

const getUniqueDocuments = (items) => {
  const ids = new Set()
  return items.filter((item) => {
    if (ids.has(item._id)) {
      return false
    } else {
      ids.add(item._id)
      return true
    }
  })
}

const defaultNavMenu = `
  "navMenu": *[_id == "main-menu"][0] {
    ...,
    items[]{
      ...,
      "route": landingPageRoute->.slug.current
    }
  }
`

const madeObjectFields = `
  "id": _id,
  _id,
  _type,
  depicts[]-> {
    "id": _id,
    label,
    mainRepresentation
  },
  label,
  hasType[]-> {
    ...
  },
  subjectOfManifest,
  mainRepresentation{
    ...,
    "palette": asset->.metadata.palette{
    	darkMuted,
      darkVibrant,
      dominant,
      lightMuted,
      vibrantMuted,
      muted,
      vibrant
    }
  },
  "manifest": coalesce(subjectOfManifest, "/api/manifest/" + _id),
  identifiedBy[] {
    ...,
    hasType[]-> {
      ...
    },
    language[]-> {
      ...
    }
  },
  activityStream[]{
    _type == 'reference' => @->{
      ...,
      carriedOutBy[]{
        ...,
        actor->{
          _id,
          label,
          mainRepresentation{
            asset->
          }
        }
      }
    },
    ...,
    hasType[]-> {
      ...
    },
    tookPlaceAt[]->,
    movedFrom->{
      _id,
      label,
      geoJSON
    },
    movedTo->{
      _id,
      label,
      geoJSON
    },
    carriedOutBy[]{
      _type == 'reference' => @->{
        'actor': {
          _id,
          label,
          mainRepresentation{
            asset->
          }
        }
      },
      ...,
      actor->{
        _id,
        label,
        mainRepresentation{
          asset->
        }
      }
    },
    target->{
      _id,
      label,
      mainRepresentation{
        asset->
      }
    }
  },
  referredToBy[] {
    ...,
    hasType[]-> {
      ...
    },
    language-> {
      ...
    }
  },
  hasCurrentOwner[]-> {
    _id,
    label
  },
  subject[]-> {
    ...
  }
`

const groupFields = `
  "id": _id,
  _id,
  _type,
  label,
  hasType[]-> {
    ...
  },
  mainRepresentation {
    ...
  },
  referredToBy[] {
    ...
  },
  "hasMember": *[_type in ["actor", "group"] && references(^._id)]{ 
    "id": _id,
    _type,
    label
  },
  "mentionedIn": *[_type in ["madeObject"] && references(^._id)]{ 
    "id": _id,
    _type,
    label,
    mainRepresentation
  }
`

const conceptFields = `
  "id": _id,
  _type,
  label
`

export async function getFrontpage() {
  const data = await getClient(true).fetch(
    `{
      "frontpage": *[ _id == "frontpage" ][0] {
        "id": _id,
        ...,
        navMenu-> {
          ...,
          items[] {
            ...,
            "route": landingPageRoute->.slug.current
          }
        } 
      },
      "latest": *[ _type == "madeObject"][0..10] {
        "id": _id,
        label,
        hasType[]-> {
          ...
        },
        mainRepresentation,	
      }
    }`
  )
  return data
}

export async function getRoutes() {
  const data = await getClient(true).fetch(
    `*[ _type == "route" ] {
      "id": _id,
      slug,
      _type
    }`
  )
  return data
}

export async function getRouteBySlug(id) {
  const data = await getClient(true).fetch(
    `*[ _type == "route" && slug.current == $id ][0] {
        "id": _id,
        ...,
        page->{
          ...,
          navMenu->{
            ...,
            items[]{
              ...,
              "route": landingPageRoute->.slug.current
            }
          },
          content[] {
            ...,
            _type == 'miradorGallery' => @{
              ...,
              items[] {
                "manifest": manifestUrl,
                _type == 'reference' => @-> {
                  "id": _id,
                subjectOfManifest,
                "manifest": coalesce(subjectOfManifest, "/api/manifest/" + _id)
                }
              },
            }
          }
        }
    }`,
    { id }
  )
  return data
}

export async function getPreviewMadeObjectByID(id) {
  const data = await getClient(true).fetch(
    `*[_type == "madeObject" && _id == $id]{
      ${madeObjectFields}
    }`,
    { id }
  )
  return data[0]
}

export async function getAllMadeObjects() {
  const data = await client.fetch(`{
    "items": *[_type == "madeObject"]{ 
      "id": _id,
      _type,
      label,
      hasType[]-> {
        ...
      },
      mainRepresentation
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getAllActors() {
  const data = await client.fetch(`{
    "items": *[_type in ["actor", "group"]] | order(label, desc){ 
      "id": _id,
      _type,
      label,
      hasType[]-> {
        ...
      },
      mainRepresentation
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getAllConcepts() {
  const data = await client.fetch(`{
    "items": *[_type in ["concept", "objectType"]] | order(label.nor, desc){ 
      "id": _id,
      _id,
      _type,
      label
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getType(id, preview) {
  const results = await getClient(preview)
    .fetch(`*[_id == $id] {
      "type": _type
    }`, {id})
  return results
}

export async function getIdPaths(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type in [...$publicDocumentTypes]] {
      "id": _id
    }`, {publicDocumentTypes})
  return results
}

export async function getId(id, type, preview) {
  const results = await getClient(preview)
    .fetch(`{
      "item": *[_id == $id][0] {
        ${type[0].type === "madeObject" ? madeObjectFields : ''}
        ${type[0].type === "actor" ? groupFields : ''}
        ${type[0].type === "group" ? groupFields : ''}
        ${type[0].type === "place" ? groupFields : ''}
        ${type[0].type === "concept" ? groupFields : ''}
        ${type[0].type === "objectType" ? groupFields : ''}
      },
      ${defaultNavMenu}
    }`,
    { id })
  return results
}

export async function getAlert(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "alert"][0] | order(_createdAt desc) {
      ...
    }`
    )
  return results
}

export async function getManifest(id, preview = false) {
  const results = await getClient(preview)
    .fetch(`*[_id == $id] {
      _id,
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
