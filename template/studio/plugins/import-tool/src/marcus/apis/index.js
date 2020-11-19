import {omit} from 'lodash'
import getQuery from './getQuery'
import getFrame from './getFrame'
import getDocument from './getDocument'
import {mapMediatypes} from './mapMediatypes'
import {createDoc, getImageBlob, patchAssetMeta, uploadImageBlob} from './storeFunctions'
const jsonld = require('jsonld/dist/jsonld.js')

export const chooseItem = async (uri) => {
  // We get the web uri from ES, so we need to switch to the data uri
  const dataUri = uri.replace('marcus', 'data.ub')

  async function getObject (id) {
    if (!id) { throw Error }
    // eslint-disable-next-line no-undef
    const results = await fetch(`https://sparql.ub.uib.no/sparql/query?query=${encodeURIComponent(getQuery(dataUri))}&output=json`)
    return results
  }

  const response = await getObject(dataUri)

  // Deal with response
  if (response.status >= 200 && response.status <= 299) {
    const result = await response.json()

    // Frame the result for nested json
    const awaitFramed = jsonld.frame(result, await getFrame(result, dataUri))
    const framed = await awaitFramed

    // Make sure we have arrays
    if (framed.subject && Array.isArray(framed.subject) === false) {
      framed.subjects = [framed.subjects]
    }
    if (framed.spatial && Array.isArray(framed.spatial) === false) {
      framed.spatial = [framed.spatial]
    }
    if (framed.depicts && Array.isArray(framed.depicts) === false) {
      framed.depicts = [framed.depicts]
    }
    if (framed.maker && Array.isArray(framed.maker) === false) {
      framed.maker = [framed.maker]
    }

    // Remove json-ld context
    const cleanJSON = omit(framed, ['@context'])

    // Map type to Sanity types
    const types = mapMediatypes([cleanJSON.type])

    /* TODO
    Include iiif manifest in asset metadata as the asset could be reused elsewhere in the dataset */
    const assetMeta = {
      source: {
        // The source this image is from
        name: 'marcus.uib.no',
        url: dataUri,
        // A string that uniquely idenitfies it within the source.
        // In this example the URL is the closest thing we have as an actual ID.
        id: cleanJSON.identifier
      },
      description: cleanJSON.title,
      creditLine: 'From sparql.ub.uib.no'
    }

    const imageResonse = await getImageBlob(cleanJSON.image)
    const asset = await uploadImageBlob(imageResonse, cleanJSON.identifier)
    await patchAssetMeta(asset._id, assetMeta)

    // Get the Sanity document
    const doc = getDocument(cleanJSON, types, asset._id)
    await createDoc(doc)

    return {
      statusCode: 200,
      body: JSON.stringify(document, asset)
    }
  } else {
    // Handle errors
    console.log(response.status, response.statusText)
    throw Error
  }
}
