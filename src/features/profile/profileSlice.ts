import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../lib/constants"
import { User } from "../../lib/types"

export type ProfileState = {
  user: User | null
  status: "loading" | "succeeded" | "failed"
}

const profileState: ProfileState = {
  user: null,
  status: "loading",
}

export const getUserInfo: any = createAsyncThunk(
  "profile/getUserInfo",
  async () => {
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${BASE_API_URL}/user/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error fetching user info")
    }

    const data = await response.json()
    return data
  }
)

const profileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserInfo.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload.body
    })
    builder.addCase(getUserInfo.rejected, (state) => {
      state.status = "failed"
    })
  },
})

export default profileSlice.reducer
