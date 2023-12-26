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
    GET_ALL_TRAINEE_FAIL,
    GET_ALL_TRAINEE_REQUEST,
    GET_ALL_TRAINEE_SUCCESS,
    GET_ALL_TRAINERS_FAIL,
    GET_ALL_TRAINERS_REQUEST,
    GET_ALL_TRAINERS_SUCCESS,
    CLEAR_ERRORS,
  } from "../constant/gymOwnersConstants";
  

  
  export const allGymOwnersReducer = (state = { gymOwners: [] }, action) => {
    switch (action.type) {
      case GET_ALL_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          gymOwners: action.payload,
        };
  
      case GET_ALL_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const loginReducer = (state = {}, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          loginStatus: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          loginStatus:action.payload.success,
          token:action.payload.token,
          user:action.payload.user
        };
  
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          loginStatus: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const registerReducer = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return {
          ...state,
          loading: true,
          registerStatus: false,
        };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          registerStatus:action.payload,
        };
  
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          registerStatus: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const verifyReducer = (state = {}, action) => {
    switch (action.type) {
      case VERIFY_REQUEST:
        return {
          ...state,
          loading: true,
          verifyStatus: false,
        };
      case VERIFY_SUCCESS:
        return {
          ...state,
          loading: false,
          verifyStatus:action.payload.success,
          token:action.payload.token
        };
  
      case VERIFY_FAIL:
        return {
          ...state,
          loading: false,
          verifyStatus: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const getLoginUserDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case GET_LOGIN_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_LOGIN_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case GET_LOGIN_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const logoutReducer = (state = {}, action) => {
    switch (action.type) {
      case LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
          logoutStatus: false,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          logoutStatus:action.payload,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          logoutStatus: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  }
  export const allGymTrainersReducer = (state = { gymOwners: [] }, action) => {
    switch (action.type) {
      case GET_ALL_TRAINERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_TRAINERS_SUCCESS:
        return {
          ...state,
          loading: false,
          trainers: action.payload,
        };
  
      case GET_ALL_TRAINERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const allGymTraineesReducer = (state = { gymOwners: [] }, action) => {
    switch (action.type) {
      case GET_ALL_TRAINEE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_TRAINEE_SUCCESS:
        return {
          ...state,
          loading: false,
          trainees: action.payload,
        };
  
      case GET_ALL_TRAINEE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };