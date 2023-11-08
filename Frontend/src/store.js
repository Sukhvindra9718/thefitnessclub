import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/features/slices/userSlices'

export default configureStore({
  reducer: {
    user: userReducer
  }
})
