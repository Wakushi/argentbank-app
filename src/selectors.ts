import { AuthState } from "./features/auth/authSlice"
import { ProfileState } from "./features/profile/profileSlice"
import { User } from "./lib/types"
import { RootState } from "./store"

export const isLogged = (state: RootState): boolean =>
  (state.auth as AuthState).logged

export const getUser = (state: RootState): User | null =>
  (state.profile as ProfileState).user

export const getProfileFetchStatus = (
  state: RootState
): "loading" | "succeeded" | "failed" => (state.profile as ProfileState).status
