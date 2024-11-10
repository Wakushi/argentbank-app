import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../lib/constants"
import { getUser } from "./userSlice"

export type AuthState = {
  status: "idle" | "loading" | "succeeded" | "failed"
}

type AsyncThunkConfig = {
  state?: AuthState
  dispatch?: Dispatch
}

const authState: AuthState = {
  status: "idle",
}

export const login: AsyncThunk<
  any,
  {
    email: string
    password: string
  },
  AsyncThunkConfig
> = createAsyncThunk("auth/login", async (credentials, { dispatch }) => {
  try {
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
    const token = data.body.token

    localStorage.setItem("access_token", token)

    try {
      await dispatch(getUser()).unwrap()
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      localStorage.removeItem("access_token")
      throw error
    }

    return data
  } catch (error) {
    localStorage.removeItem("access_token")
    throw error
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logout: () => {
      localStorage.removeItem("access_token")
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(login.fulfilled, (state) => {
      state.status = "succeeded"
    })
    builder.addCase(login.rejected, (state) => {
      state.status = "failed"
    })
  },
})

function hasTokenExpired(): boolean {
  const token = localStorage.getItem("access_token")

  if (!token) return true

  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]))

  if (!jwtPayload || !jwtPayload.exp) return true

  const { exp: expiration } = jwtPayload

  return Date.now() >= expiration * 1000
}

function isLogged(): boolean {
  return !hasTokenExpired()
}

export { isLogged }
export const { logout } = authSlice.actions
export default authSlice.reducer
