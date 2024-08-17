// // Package Imports
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

// // Reducer Imports
// import rootReducer from '@/redux/index';

// // Initializing State
// const initialState = {};

// const middleware = [thunk];

// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export default store;


import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import storage from redux-persist

import rootReducer from '../redux/index';

const persistConfig = {
  key: "root",
  storage: storage, // Use storage from redux-persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk];
const initialState = {};

const store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
export default store;