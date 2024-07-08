import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"

export default function SigninPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { username, password } = Object.fromEntries(formData.entries())
    try {
      await dispatch(
        login({
          email: username,
          password: password,
        })
      ).unwrap()
      navigate("/profile")
    } catch (error: any) {
      alert(error.message)
      console.error("Failed to login:", error)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
