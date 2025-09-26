import "./NavBar.scss"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../pages/Auth/AuthProvider"
import ProfilePicture from "../components/ProfilePicture/ProfilePicture"
import Dropdown from "../components/Dropdown/index"
import { FiLogOut } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"

export default function NavBar() {

    const { user, logoutAction } = useAuth()
    const navigate = useNavigate()

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
                    {
                        user ? (
                            <Dropdown>
                                <Dropdown.Button>
                                    {user.email}
                                    <ProfilePicture width={25} height={25} />
                                </Dropdown.Button>
                                <Dropdown.Content>
                                    <Dropdown.List>
                                        <Dropdown.Item onClick={() => navigate("/preferences")}>
                                            Preferences
                                            <IoSettingsOutline />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate("/profile")}>
                                            Profile
                                            <CgProfile />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={logoutAction}>
                                            Logout
                                            <FiLogOut />
                                        </Dropdown.Item>
                                    </Dropdown.List>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                        <NavLink to="/auth" activeclassname="active">
                            <button>
                                Login
                            </button>
                        </NavLink>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}