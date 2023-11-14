import { configureStore } from '@reduxjs/toolkit'
import { allGymOwnersReducer,loginReducer,registerReducer,verifyReducer,logoutReducer,getLoginUserDetailReducer,allGymTraineesReducer,allGymTrainersReducer} from './reducers/gymOwnersReducer'



export default configureStore({
  reducer: {
    gymOwners: allGymOwnersReducer,
    auth:loginReducer,
    register:registerReducer,
    verify:verifyReducer,
    logout:logoutReducer,
    getLoginUserDetail:getLoginUserDetailReducer,
    allGymTrainees:allGymTraineesReducer,
    allGymTrainers:allGymTrainersReducer
  }
})


