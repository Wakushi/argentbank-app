import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import SigninPage from "./pages/Signin"
import HomePage from "./pages/Home"
import DashboardPage from "./pages/Dashboard"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/profile" element={<DashboardPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  )
}
