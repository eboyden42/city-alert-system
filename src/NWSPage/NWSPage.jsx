import "./NWSPage.scss"
import { useEffect, useState } from "react"
import AlertCard from "../components/AlertCard/AlertCard"

export default function NWSPage() {
    const [nwsAlerts, setNwsAlerts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/nws")
            .then(response => response.json())
            .then(data => setNwsAlerts(data))
            .catch(error => console.error("Error fetching NWS alerts:", error))
    }, [])

    return (
        <div className="nws-page">
            <h1>NWS Alerts</h1>
            <div className="nws-alerts">
                {
                    nwsAlerts.length === 0 ? <h5>No weather alerts at this time.</h5> :
                    nwsAlerts.map((alert, index) => (
                        <AlertCard key={index} alert={alert} />
                    ))
                }
            </div>
        </div>
    )
}