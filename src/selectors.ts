import { UserState } from "./features/user/userSlice"
import { User } from "./lib/types"
import { RootState } from "./store"

export const isLogged = (state: RootState): boolean =>
  (state.user as UserState).logged

export const getUserInfo = (state: RootState): User | null =>
  (state.user as UserState).user

export const getProfileFetchStatus = (
  state: RootState
): "loading" | "succeeded" | "failed" => (state.user as UserState).status
