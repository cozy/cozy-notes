/** global __DEVELOPMENT__ **/
import { createStore, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

const configureStore = client => {
  const persistConfig = {
    key: 'root',
    storage
  }
  const rootReducer = combineReducers({
    cozy: client.reducer()
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
