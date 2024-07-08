import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { isLogged } from "../../selectors"

export default function Header() {
  const logged = useSelector(isLogged)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSignOut() {
    dispatch(logout())
    navigate("/")
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
            <button className="main-nav-item sign-out" onClick={handleSignOut}>
              <i className="fa fa-user-circle"></i>Sign Out
            </button>
          ) : (
            <a className="main-nav-item" href="/signin">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
