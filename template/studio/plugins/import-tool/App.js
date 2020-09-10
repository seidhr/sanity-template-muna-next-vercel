import React, {useReducer, useEffect, useState} from 'react'
import client from 'part:@sanity/base/client'
import fetch from 'unfetch'
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

  const chooseItem = (item) => {
    console.log(item)
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
      Important to include iiif manifest in asset metadata as the asset could be reused else where in the dataset
      const asset = {
      kind: 'url',
      value: item._links.thumbnail_large.href,
      assetDocumentProps: {
        originalFilename: item.id, // Use this filename when the asset is saved as a file by someone.
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
    } */

    fetch(imageUrl)
      .then(response => response.blob)
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
      .then(blob => URL.createObjectURL(blob))
      .then(buffer => client.assets.upload('image', buffer, {filename: 'myImage.jpg'}))
      .then(document => {
        console.log('The file was uploaded!', document)
      })
      .catch(error => {
        console.error('Upload failed:', error.message)
      })

    client
      .createIfNotExists(doc).then(res => {
        console.log(`${res._id} was imported!`)
      })
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
      <p className='App-intro'>Sharing a few of our favourite movies</p>
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
