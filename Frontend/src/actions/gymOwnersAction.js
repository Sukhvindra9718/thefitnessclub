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
  VERIFY_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_LOGIN_USER_REQUEST,
  GET_LOGIN_USER_SUCCESS,
  GET_LOGIN_USER_FAIL,
} from '../constant/gymOwnersConstants'

import axios from 'axios'
import Cookies from 'js-cookie'


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
      const response = await fetch('http://192.168.244.79:3001/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', data.token, { expires: 7 });
        dispatch({ type: LOGIN_SUCCESS, payload: data })
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export const register =
  (formData) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST })

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      const { data } = await axios.post(`http://192.168.244.79:3001/api/v1/register`,formData,config)

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.success })
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response})
    }
  }

  export const verify =
  (email, otp ) =>
  async (dispatch) => {
    try {
      dispatch({ type: VERIFY_REQUEST })

      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.post(`http://192.168.244.79:3001/api/v1/verify`,{ email, otp },config)

      dispatch({ type: VERIFY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: VERIFY_FAIL, payload: error.response})
    }
  }

  export const getLoginUser = () => async (dispatch) => {
    try {
      dispatch({ type: GET_LOGIN_USER_REQUEST })
      const token = Cookies.get('token');
      const config = { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`} }
  
      const { data } = await axios.get(`http://192.168.244.79:3001/api/v1/getUserDetail/:id`, config);
      console.log("action",data.user)
      Cookies.set('user', data.user, { expires: 7 });
      dispatch({ type: GET_LOGIN_USER_SUCCESS, payload: data.user })
    } catch (error) {
      dispatch({ type: GET_LOGIN_USER_FAIL, payload: error.response })
    }
  }

  export const logout = () => async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_REQUEST })
  
      const config = { headers: { 'Content-Type': 'application/json' } }
  
      const { data } = await axios.post(`http://192.168.244.79:3001/api/v1/logout`, config)

      dispatch({ type: LOGOUT_SUCCESS, payload: data.user })
    }
    catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response })
    }
  }