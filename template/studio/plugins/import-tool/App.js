import React, {useReducer, useEffect, useState} from 'react'
import client from 'part:@sanity/base/client'
// import fetch from 'unfetch'
import Header from './Header'
import Preview from './Preview'
import Search from './Search'
import styles from './ImportTool.css'

const IMPORT_API_URL = 'https://api.nb.no/catalog/v1/items/?'

const initialState = {
  sourceAPI: 'nb',
  loading: true,
  searchParameter: '',
  items: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case 'SEARCH_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    case 'IMPORT_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    case 'IMPORT_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [searchParameter, setSearchParameter] = useState('')

  const chooseItem = async (item) => {
    // Get a 200x200px thumbnail. Maybe change to a bigger size based on thumbnail_custom.
    const imageUrl = item._links.thumbnail_large.href

    // TODO:  Map moronic 'bøker' to hasType.ref: 9c8240d2-23b6-45f4-8501-bc2723fbf75e
    const doc = {
      _type: 'madeObject',
      _id: `imported.${state.sourceAPI}.${item.id}`,
      accessState: 'open',
      editorialState: 'published',
      license: item.accessInfo && item.accessInfo.isPublicDomain ? 'https://creativecommons.org/publicdomain/mark/1.0/' : 'https://rightsstatements.org/vocab/CNE/1.0/',
      label: item.metadata.title,
      preferredIdentifier: item.id,
      subjectOfManifest: item._links.presentation.href
    }

    /* TODO
      Important to include iiif manifest in asset metadata as the asset could be reused else where in the dataset */
    const assetMeta = {
      source: {
        // The source this image is from
        name: 'nb.no',
        url: item._links.presentation.href,
        // A string that uniquely idenitfies it within the source.
        // In this example the URL is the closest thing we have as an actual ID.
        id: item.id
      },
      description: item.metadata.title,
      creditLine: 'From nb.no'
    }

    const getImageBlob = async (url) => {
      const response = fetch(url)
        .then(response => response.body)
        .then(rs => {
          const reader = rs.getReader()

          return new ReadableStream({
            async start (controller) {
              while (true) {
                const {done, value} = await reader.read()

                // When no more data needs to be consumed, break the reading
                if (done) {
                  break
                }

                // Enqueue the next data chunk into our target stream
                controller.enqueue(value)
              }

              // Close the stream
              controller.close()
              reader.releaseLock()
            }
          })
        })
      // Create a new response out of the stream
        .then(rs => new Response(rs))
      // Create an object URL for the response
        .then(response => response.blob())
      return response
    }

    const uploadImageBlob = async (blob) => {
      const res = client.assets
        .upload('image', blob, {contentType: blob.type, filename: `imported.${state.sourceAPI}.${item.id}`})
        .then(document => {
          console.log('The image was uploaded!', document)
          return document
        })
        .catch(error => {
          console.error('Upload failed:', error.message)
        })
      return res
    }

    const createDoc = async (doc) => {
      const res = client
        .createIfNotExists(doc)
        .then(result => {
          console.log(`${result._id} was imported!`)
          return result
        })
      return res
    }

    const setAssetRef = async (docID, assetID) => {
      await client
        .patch(docID)
        .set({
          mainRepresentation: {
            _type: 'mainRepresentation',
            asset: {
              _type: 'reference',
              _ref: assetID
            }
          }
        })
        .commit()
        .then(document => {
          console.log('The asset was hooked up!', document)
        })
        .catch(error => {
          console.error('Failed:', error.message)
        })
    }

    const patchAssetMeta = async (id, meta) => {
      client
        .patch(id)
        .set(meta)
        .commit()
        .then(document => {
          console.log('The image was patched!', document)
        })
        .catch(error => {
          console.error('Patch failed:', error.message)
        })
    }

    try {
      const imageResonse = await getImageBlob(imageUrl)
      const asset = await uploadImageBlob(imageResonse)
      await patchAssetMeta(asset._id, assetMeta)

      const document = await createDoc(doc)
      if (asset && document) {
        await setAssetRef(document._id, asset._id)
      }

      return {
        statusCode: 200,
        body: JSON.stringify(document, asset)
      }
    } catch (err) {
      console.log('There was an error', err)
    }

    // getImageBlob(imageUrl)
  }

  useEffect(() => {
    fetch(IMPORT_API_URL + new URLSearchParams({
      digitalAccessibleOnly: true}))
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: jsonResponse._embedded.items
        })
      })
  }, [])

  const search = searchValue => {
    setSearchParameter(searchValue)

    dispatch({
      type: 'SEARCH_REQUEST'
    })

    fetch(IMPORT_API_URL + new URLSearchParams({
      q: searchParameter,
      digitalAccessibleOnly: true}))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.page.totalPages) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse._embedded.items
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const {items, errorMessage, loading} = state

  return (
    <div className={styles.container}>
      <Header />
      <Search search={search} />
      <div className={styles.grid}>
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          items.map((item) => (
            <Preview key={item.id} item={item} searchValue={searchParameter} onClick={chooseItem} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
