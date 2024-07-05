import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
