import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { isLogged } from "../../selectors"
import { AppDispatch } from "../../store"

export default function Header() {
  const logged = useSelector(isLogged)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  function handleSignOut() {
    dispatch(logout())
    navigate("/")
  }

  function handleSignIn() {
    navigate("/login")
  }

  return (
    <header>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="/images/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {logged ? (
            <button className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-user-circle"></i>Sign Out
            </button>
          ) : (
            <button className="main-nav-item" onClick={handleSignIn}>
              <i className="fa fa-user-circle"></i>Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
