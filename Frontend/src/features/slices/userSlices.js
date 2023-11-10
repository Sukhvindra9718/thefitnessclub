import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    Success: false,
    Reject: false,
    Loading: false
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },

    signIn: (state, action) => {
      const { email, password } = action.payload
      if ((email, password)) {
        state.Loading = true
        // call the api here
      }
    },

    signUp: (state, action) => {
      const { name, email, phoneNumber, profileImage, password, confirmPassword } = action.payload
      if (action.payload) {
        state.Loading = true
        console.log(name, email, phoneNumber, profileImage, password, confirmPassword)
        // call the api here
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, signIn, signUp } = userSlice.actions

export default userSlice.reducer
