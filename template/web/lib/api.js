import client, { previewClient } from './sanity'
const getClient = (preview) => (preview ? previewClient : client)

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

const madeObjectFields = `
  "id": _id,
  label,
  hasType[]-> {
    ...
  },
  mainRepresentation,
  referredToBy[] {
    ...
  }
`


export async function getPreviewMadeObjectByID(id) {
  const data = await getClient(true).fetch(
    `*[_type == "madeObject" && _id == $id]{
      ${madeObjectFields}
    }`,
    { id }
  )
  return data[0]
}

export async function getAllMadeObjectsWithID() {
  const data = await client.fetch(`*[_type == "madeObject"]{ 
    ${madeObjectFields}
   }`)
  return data
}

export async function getMadeObject(id, preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "madeObject" && _id == $id] {
      ${madeObjectFields}
    }`,
    { id }
    )
  console.log(results)
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
