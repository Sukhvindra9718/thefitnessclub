import {
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL
} from '../constant/userConstants'

import axios from 'axios'

export const getAllMembers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }

    const { data } = await axios.get(`http://192.168.244.79:3001/api/v1/getAllUsers`, config)

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.gymOwners })
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAIL, payload: error.response })
  }
}
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST })

      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.post(
        `http://192.168.244.79:3001/api/v1/login`,
        { email, password },
        config
      )

      dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response})
    }
  }

  export const register =
  (formData) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST })
      console.log("action",formData.getAll('name'))

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      const { data } = await axios.post(`http://192.168.244.79:3001/api/v1/register`,formData,config)
        console.log("action",data)
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.success })
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response})
    }
  }

  export const verify =
  ({ email, otp }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VERIFY_REQUEST })

      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.post(
        `http://192.168.244.79:3001/api/v1/verify`,
        { email, otp },
        config
      )

      dispatch({ type: VERIFY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: VERIFY_FAIL, payload: error.response})
    }
  }