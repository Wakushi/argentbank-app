import {
  AsyncThunk,
  Dispatch,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../lib/constants"
import { User } from "../../lib/types"

type AsyncThunkConfig = {
  state?: UserState
  dispatch?: Dispatch
}

export type UserState = {
  user: User | null
  logged: boolean
  status: "loading" | "succeeded" | "failed"
}

const userState: UserState = {
  user: null,
  logged: false,
  status: "loading",
}

export const login: AsyncThunk<
  any,
  {
    email: string
    password: string
  },
  AsyncThunkConfig
> = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
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

export const getUser: AsyncThunk<any, void, AsyncThunkConfig> =
  createAsyncThunk("profile/getUser", async () => {
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
  })

export const updateUser: AsyncThunk<
  any,
  {
    firstName: string
    lastName: string
  },
  AsyncThunkConfig
> = createAsyncThunk("profile/updateUser", async (payload) => {
  const token = localStorage.getItem("access_token")
  const response = await fetch(`${BASE_API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Error updating user info")
  }

  const data = await response.json()
  return data
})

const userSlice = createSlice({
  name: "auth",
  initialState: userState,
  reducers: {
    logout: (state) => {
      state.logged = false
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
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload.body
      if (!state.logged) {
        state.logged = true
      }
    })
    builder.addCase(getUser.rejected, (state) => {
      state.status = "failed"
    })
    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload.body
    })
    builder.addCase(updateUser.rejected, (state) => {
      state.status = "failed"
    })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
