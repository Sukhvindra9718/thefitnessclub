import { configureStore } from '@reduxjs/toolkit'
import { allGymOwnersReducer,loginReducer,registerReducer,verifyReducer} from './reducers/userReducer'



export default configureStore({
  reducer: {
    gymOwners: allGymOwnersReducer,
    auth:loginReducer,
    register:registerReducer,
    verify:verifyReducer
  }
})


