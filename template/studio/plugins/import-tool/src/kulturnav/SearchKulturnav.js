/* eslint-disable no-undef */
import React, {useReducer, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
// import fetch from 'unfetch'
import Preview from './components/Preview'
import Search from './components/Search'
import styles from '../ImportTool.css'
import {searchReducer} from './reducers/searchReducer'
import {chooseItem} from './apis'

const IMPORT_API_URL = 'https://kulturnav.org/api/search/'

export const initialState = {
  sourceAPI: 'nb',
  apiURL: 'https://kulturnav.org/api/search/',
  loading: true,
  searchParameter: '',
  items: [],
  page: 0,
  totalElements: 0,
  limit: 30,
  errorMessage: null,
}

const SearchNB = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  /* useEffect(() => {
    fetch(state.apiURL + new URLSearchParams({}))
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: jsonResponse,
          totalElements: jsonResponse.length,
        })
      })
  }, []) */

  const handlePageClick = (data) => {
    let selected = data.selected
    let page = selected

    dispatch({
      type: 'SEARCH_REQUEST',
      searchParameter: state.searchParameter,
    })

    fetch(
      state.apiURL + 'actualEntityType:Person%20OR%20Concept,compoundName:' + state.searchParameter
        ? state.searchParameter
        : '' + new URLSearchParams({}),
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse && jsonResponse.length) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse,
            totalElements: jsonResponse.length,
            page: page,
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error,
          })
        }
      })
  }

  const search = (searchValue) => {
    // setSearchParameter(searchValue)

    dispatch({
      type: 'SEARCH_REQUEST',
      searchParameter: searchValue,
    })

    fetch(
      IMPORT_API_URL +
        'actualEntityType:Person%20OR%20Concept,compoundName:' +
        searchValue +
        new URLSearchParams({}),
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse && jsonResponse.length) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse,
            totalElements: jsonResponse.length,
            page: 0,
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error,
          })
        }
      })
  }

  const {searchParameter, items, totalElements, page, limit, errorMessage, loading} = state
  console.log(items)
  return (
    <div>
      <Search search={search} />
      <p>{totalElements}</p>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        forcePage={page}
        pageCount={totalElements / limit}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        breakClassName={styles.break}
        activeClassName={styles.active}
        onPageChange={handlePageClick}
      />
      <div className={styles.grid}>
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          items.map((item) => (
            <Preview key={item.id} item={item} searchValue={searchParameter} onClick={chooseItem} />
          ))
        )}
      </div>
    </div>
  )
}

export default SearchNB
