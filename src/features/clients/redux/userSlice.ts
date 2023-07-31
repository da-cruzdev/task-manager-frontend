import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../auth/interfaces/signData.interfaces"

interface UserState {
  data: User | null
}

const initialState: UserState = {
  data: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
