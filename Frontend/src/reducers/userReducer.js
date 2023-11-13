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
    CLEAR_ERRORS,
  } from "../constant/userConstants";
  
//   export const userReducer = (state = { user:[] }, action) => {
//     switch (action.type) {
//       case LOGIN_REQUEST:
//       case REGISTER_USER_REQUEST:
//       case LOAD_USER_REQUEST:
//         return {
//           loading: true,
//           isAuthenticated: false,
//         };
//       case LOGIN_SUCCESS:
//       case REGISTER_USER_SUCCESS:
//       case LOAD_USER_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           isAuthenticated: true,
//           user: action.payload,
//         };
  
//       case LOGOUT_SUCCESS:
//         return {
//           loading: false,
//           user: null,
//           isAuthenticated: false,
//         };
//       case LOGIN_FAIL:
//       case REGISTER_USER_FAIL:
//         return {
//           ...state,
//           loading: false,
//           isAuthenticated: false,
//           user: null,
//           error: action.payload,
//         };
  
//       case LOAD_USER_FAIL:
//         return {
//           loading: false,
//           isAuthenticated: false,
//           user: null,
//           error: action.payload,
//         };
  
//       case LOGOUT_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
  
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
  
//       default:
//         return state;
//     }
//   };
  
//   export const profileReducer = (state = {}, action) => {
//     switch (action.type) {
//       case UPDATE_PROFILE_REQUEST:
//       case UPDATE_PASSWORD_REQUEST:
//       case UPDATE_USER_REQUEST:
//       case DELETE_USER_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case UPDATE_PROFILE_SUCCESS:
//       case UPDATE_PASSWORD_SUCCESS:
//       case UPDATE_USER_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           isUpdated: action.payload,
//         };
  
//       case DELETE_USER_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           isDeleted: action.payload.success,
//           message: action.payload.message,
//         };
  
//       case UPDATE_PROFILE_FAIL:
//       case UPDATE_PASSWORD_FAIL:
//       case UPDATE_USER_FAIL:
//       case DELETE_USER_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
  
//       case UPDATE_PROFILE_RESET:
//       case UPDATE_PASSWORD_RESET:
//       case UPDATE_USER_RESET:
//         return {
//           ...state,
//           isUpdated: false,
//         };
  
//       case DELETE_USER_RESET:
//         return {
//           ...state,
//           isDeleted: false,
//         };
  
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
  
//       default:
//         return state;
//     }
//   };
  
//   export const forgotPasswordReducer = (state = {}, action) => {
//     switch (action.type) {
//       case FORGOT_PASSWORD_REQUEST:
//       case RESET_PASSWORD_REQUEST:
//         return {
//           ...state,
//           loading: true,
//           error: null,
//         };
//       case FORGOT_PASSWORD_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           message: action.payload,
//         };
  
//       case RESET_PASSWORD_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           success: action.payload,
//         };
  
//       case FORGOT_PASSWORD_FAIL:
//       case RESET_PASSWORD_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
  
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
  
//       default:
//         return state;
//     }
//   };
  
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
          token:action.payload.token
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
          loginStatus: false,
        };
      case VERIFY_SUCCESS:
        return {
          ...state,
          loading: false,
          loginStatus:action.payload.success,
          token:action.payload.token
        };
  
      case VERIFY_FAIL:
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
//   export const userDetailsReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//       case USER_DETAILS_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case USER_DETAILS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           user: action.payload,
//         };
  
//       case USER_DETAILS_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
  
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
  
//       default:
//         return state;
//     }
//   };
  