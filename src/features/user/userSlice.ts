import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit"
import { BASE_API_URL } from "../../lib/constants"
import { User } from "../../lib/types"

export type UserState = {
  user: User | null
  status: "idle" | "loading" | "succeeded" | "failed"
}

type AsyncThunkConfig = {
  state?: UserState
  dispatch?: Dispatch
}

const userState: UserState = {
  user: null,
  status: "idle",
}

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
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload.body
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

export default userSlice.reducer
