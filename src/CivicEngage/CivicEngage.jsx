import "./CivicEngage.scss"
import AlertCard from "../components/AlertCard/AlertCard"
import { useState, useEffect } from "react"
import { Outlet, NavLink } from "react-router"

export default function CivicEngage() {

    return (
        <div className="civic-engage">
            <h1>CivicEngage Alerts</h1>
            <hr />
            <p>Get the latest alerts from the City of Charlottesville's CivicEngage platform, organized by topic.</p>
            <nav className="navbar">
                <NavLink to="police" className="civic" >Police</NavLink>
                <NavLink to="fire" className="civic">Fire</NavLink>
                <NavLink to="traffic" className="civic">Traffic</NavLink>
                <NavLink to="utilities" className="civic">Utilities</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}