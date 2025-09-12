import "./NavBar.scss"
import { NavLink } from "react-router"

export default function NavBar() {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-home-link">
                <div className="navbar-logo">
                    <img src="/logo.png" alt="Charlottesville Logo" />
                    <h1>CCAS</h1>
                </div>
            </a>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/civicengage" activeclassname="active">CivicEngage</NavLink>
                </li>
                <li>
                    <NavLink to="/nws" activeclassname="active">NWS</NavLink>
                </li>
                <li>
                    <NavLink to="/airnow" activeclassname="active">AirNow</NavLink>
                </li>
                <li>
                    <NavLink to="/newscatcher" activeclassname="active">NewsCatcher</NavLink>
                </li>
                <li>
                    <NavLink to="/allalerts" activeclassname="active">All Alerts</NavLink>
                </li>
            </ul>
            <ul className="navbar-links right">
                <li>
                    
                    <NavLink to="/auth" activeclassname="active">
                        <button>
                            Login
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}