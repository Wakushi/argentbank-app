import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import SigninPage from "./pages/Signin"
import HomePage from "./pages/Home"
import DashboardPage from "./pages/Dashboard"
import PrivateRoute from "./pages/PrivateRoute"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  )
}
