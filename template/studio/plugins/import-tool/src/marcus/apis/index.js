import {mapMediatypes} from './mapMediatypes'
import {omit} from 'lodash'
import getQuery from './getQuery'
import getFrame from './getFrame'
import getDocument from './getDocument'
import {createDoc, getImageBlob, patchAssetMeta, setAssetRef, uploadImageBlob} from './storeFunctions'
const jsonld = require('jsonld/dist/jsonld.js')

export const chooseItem = async (uri) => {
  // We get the web uri from ES, so we need to switch to the data uri
  const dataUri = uri.replace('marcus', 'data.ub')

  async function getObject (id) {
    if (!id) { throw Error }
    // eslint-disable-next-line no-undef
    const results = await fetch(`http://sparql.ub.uib.no/sparql/query?query=${encodeURIComponent(getQuery(dataUri))}&output=json`)
    return results
  }

  const response = await getObject(dataUri)

  // Deal with response
  if (response.status >= 200 && response.status <= 299) {
    const result = await response.json()

    // Frame the result for nested json
    const awaitFramed = jsonld.frame(result, await getFrame(result, dataUri))
    const framed = await awaitFramed

    // Remove json-ld context
    const cleanJSON = omit(framed, ['@context'])

    // Map type to Sanity types
    const types = mapMediatypes([cleanJSON.type])
    console.log(types)

    // Get the Sanity document
    const doc = getDocument(cleanJSON, types)
    console.log(doc)

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

    const document = await createDoc(doc)

    if (asset && document) {
      await setAssetRef(document._id, asset._id)
    }

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
