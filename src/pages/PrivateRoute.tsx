import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getUserInfo } from "../selectors"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { getUser } from "../features/user/userSlice"
import { isLogged } from "../features/user/authSlice"

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const user = useSelector(getUserInfo)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isLogged()) {
      navigate("/login")
    }

    if (!user) {
      fetchUser()
    }

    async function fetchUser(): Promise<void> {
      try {
        await dispatch(getUser()).unwrap()
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        localStorage.removeItem("access_token")
        navigate("/login")
      }
    }
  }, [])

  return <>{children}</>
}
