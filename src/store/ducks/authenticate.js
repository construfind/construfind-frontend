import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  addUser: ['user'],
  removeUser: [''],
  addToken: ['token'],
  removeToken: ['']
})

export const AuthenticateTypes = Types

export default Creators

export const INITIAL_STATE = {
  user: {},
  token: ''
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER]: (state, { user }) => ({ ...state, user }),
  [Types.REMOVE_USER]: state => ({ ...state, user: {} }),
  [Types.ADD_TOKEN]: (state, { token }) => ({ ...state, token }),
  [Types.REMOVE_TOKEN]: state => ({ ...state, token: '' })
})
