import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { AppDispatch } from "../../store"
import { isLogged, logout } from "../../features/user/authSlice"
import { getUserInfo } from "../../selectors"
import { useSelector } from "react-redux"

export default function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector(getUserInfo)

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
        <NavLink className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/images/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {isLogged() && !!user ? (
            <div className="logged-nav">
              <NavLink to="/profile" className="main-nav-item">
                <i className="fa fa-user-circle"></i> {user.firstName}
              </NavLink>
              <button className="main-nav-item" onClick={handleSignOut}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="main-nav-item" onClick={handleSignIn}>
              <i className="fa fa-sign-in"></i>Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
