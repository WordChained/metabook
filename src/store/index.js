import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { robotReducer } from './reducers/robotReducer';
import { userReducer } from './reducers/userReducer';
import { itemReducer } from './reducers/itemReducer'
import { chatReducer } from './reducers/chatReducer'
import { cloudinaryReducer } from './reducers/cloudinaryReducer'
import { friendsReducer } from './reducers/friendsReducer'
import { notificationReducer } from './reducers/notificationReducer'


// Connecting redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose

// Combining reducers into one
const rootReducer = combineReducers({
  itemModule: itemReducer,
  chatModule: chatReducer,
  userModule: userReducer,
  friendsModule: friendsReducer,
  cloudinaryModule: cloudinaryReducer,
  notificationModule: notificationReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
