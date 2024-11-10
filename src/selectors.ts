import { UserState } from "./features/user/userSlice"
import { User } from "./lib/types"
import { RootState } from "./store"

export const getUserInfo = (state: RootState): User | null =>
  (state.user as UserState).user

export const getProfileFetchStatus = (
  state: RootState
): "idle" | "loading" | "succeeded" | "failed" =>
  (state.user as UserState).status
