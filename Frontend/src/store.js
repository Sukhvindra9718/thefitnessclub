import { configureStore } from '@reduxjs/toolkit'
import { allGymOwnersReducer } from './reducers/userReducer'


const initialState = {
  gymOwners: [],
  loading: false,
}

export default configureStore({
  reducer: {
    gymOwners: allGymOwnersReducer
  },
  initialState
})


