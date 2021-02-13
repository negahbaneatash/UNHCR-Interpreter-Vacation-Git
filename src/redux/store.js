import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
// import { logger } from "redux-logger";

import myLogger from "./myLogger";
import persistedRootReducer from "./root.reducer";


const store = createStore(persistedRootReducer, applyMiddleware(myLogger));
const myPersistor = persistStore(store)


export {store,myPersistor};


