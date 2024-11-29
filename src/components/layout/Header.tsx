import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../../store"
import { isLogged, logout } from "../../features/user/authSlice"

export default function Header() {
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
          {isLogged() ? (
            <>
              <a href="/profile" className="main-nav-item">
                Profile
              </a>
              <button className="main-nav-item" onClick={handleSignOut}>
                <i className="fa fa-user-circle"></i>Sign Out
              </button>
            </>
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
