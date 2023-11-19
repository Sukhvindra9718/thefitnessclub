import {
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  LOGIN_SUCCESS,
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
  GET_ALL_TRAINERS_REQUEST,
  GET_ALL_TRAINERS_SUCCESS,
  GET_ALL_TRAINERS_FAIL,
  GET_ALL_TRAINEE_REQUEST,
  GET_ALL_TRAINEE_SUCCESS,
  GET_ALL_TRAINEE_FAIL
} from '../constant/gymOwnersConstants'

import axios from 'axios'
import Cookies from 'js-cookie'

const IP = '192.168.1.12'
// Admin Actions
export const getAllMembers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST })

    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }

    const { data } = await axios.get(`http://${IP}:3001/api/v1/getAllUsers`, config)

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.gymOwners })
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAIL, payload: error.response })
  }
}

// Gym Owner Actions
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`http://${IP}:3001/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()

        const demo = data.user
        delete demo.profile_image
        delete demo.password

        Cookies.set('user', demo.id+'', { expires: 7 })

        Cookies.set('token', data.token, { expires: 7 })
        dispatch({ type: LOGIN_SUCCESS, payload: data ? data : {} })
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    const { data } = await axios.post(`http://${IP}:3001/api/v1/register`, formData, config)

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response })
  }
}

export const verify = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }

    const { data } = await axios.post(`http://${IP}:3001/api/v1/verify`, { email, otp }, config)
    Cookies.set('token', data.token, { expires: 7 })
    const demo = data.user
    delete demo.profile_image
    delete demo.password
    const user = JSON.stringify(demo)

    Cookies.set('user', user, { expires: 7 })
    dispatch({ type: VERIFY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: VERIFY_FAIL, payload: error.response })
  }
}

export const getLoginUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOGIN_USER_REQUEST })
    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }

    const { data } = await axios.get(`http://${IP}:3001/api/v1/getUserDetail/${id}`, config)

    localStorage.setItem('user', JSON.stringify(data.user));

    dispatch({ type: GET_LOGIN_USER_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({ type: GET_LOGIN_USER_FAIL, payload: error.response })
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }

    const { data } = await axios.post(`http://${IP}:3001/api/v1/logout`, config)

    dispatch({ type: LOGOUT_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response })
  }
}
export const getAllTrainers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRAINERS_REQUEST })

    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }

    const { data } = await axios.get(`http://${IP}:3001/api/v1/trainer/getAllTrainers`, config)
    console.log('action', data)
    dispatch({ type: GET_ALL_TRAINERS_SUCCESS, payload: data.trainers })
  } catch (error) {
    dispatch({ type: GET_ALL_TRAINERS_FAIL, payload: error?.response })
  }
}
export const getAllTrainees = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRAINEE_REQUEST })

    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }

    const { data } = await axios.get(`http://${IP}:3001/api/v1/trainee/getAllTrainee`, config)

    dispatch({ type: GET_ALL_TRAINEE_SUCCESS, payload: data.trainees })
  } catch (error) {
    dispatch({ type: GET_ALL_TRAINEE_FAIL, payload: error.response })
  }
}
