import "./CivicEngage.scss"
import AlertCard from "../components/AlertCard/AlertCard"
import { useState, useEffect } from "react"

export default function CivicEngage() {
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/police`)
            .then(response => response.json())
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="civic-engage">
            <h1>CivicEngage Alerts</h1>
            <hr />
            <p>Latest alerts from the City of Charlottesville's CivicEngage platform.</p>
            {
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }

        </div>
    )
}