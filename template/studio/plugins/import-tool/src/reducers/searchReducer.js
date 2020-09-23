export const searchReducer = (state, action) => {
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
        items: action.payload,
        totalElements: action.totalElements,
        page: action.page
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