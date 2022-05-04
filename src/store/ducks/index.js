import { combineReducers } from 'redux'
import { reducer as offline } from 'redux-offline-queue'
import { reducer as authenticate } from './authenticate'
import { reducer as register } from './register'

export default combineReducers({
  offline,
  authenticate,
  register
})
