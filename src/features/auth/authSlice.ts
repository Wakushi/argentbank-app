import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../lib/constants"

export type AuthState = {
  logged: boolean
  status: "loading" | "succeeded" | "failed"
}

const authState: AuthState = {
  logged: false,
  status: "loading",
}

export const login: any = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await fetch(`${BASE_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    return data
  }
)

const authSlice: any = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logout: (state) => {
      state.logged = false
      console.log("Logged: ", state.logged)
      localStorage.removeItem("access_token")
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded"
      const token = action.payload.body.token
      localStorage.setItem("access_token", token)
      state.logged = true
    })
    builder.addCase(login.rejected, (state) => {
      state.status = "failed"
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
