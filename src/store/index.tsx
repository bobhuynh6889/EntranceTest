import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware)(createStore)

function configureStore() {
  return createStoreWithMiddleware(rootReducer)
}

const store = configureStore()

export default store
