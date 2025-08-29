import { Outlet } from "react-router"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import "./BaseLayout.scss"

export default function BaseLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}