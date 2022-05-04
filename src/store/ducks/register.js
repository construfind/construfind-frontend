import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  addUserRegister: ['userRegister'],
  removeUserRegister: [''],
})

export const RegisterTypes = Types

export default Creators

export const INITIAL_STATE = {
  userRegister: {}
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER_REGISTER]: (state, { userRegister }) => ({ ...state, userRegister }),
  [Types.REMOVE_USER_REGISTER]: state => ({ ...state, userRegister: {} })
})
