import {
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
  } from "../constant/userConstants";

import axios from "axios";
export const getAllMembers = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.get(`http://192.168.37.79:3001/api/v1/getAllUsers`,config);
      console.log("data",data)
  
      dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.gymOwners });
    } catch (error) {
      dispatch({ type: GET_ALL_USER_FAIL, payload: error.response });
    }
  };