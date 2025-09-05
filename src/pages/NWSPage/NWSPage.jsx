import "./NWSPage.scss"
import { useEffect, useState } from "react"
import AlertCard from "../../components/AlertCard/AlertCard"
import { fetchNWSAlerts } from "../../api"

export default function NWSPage() {
    const [nwsAlerts, setNwsAlerts] = useState([])

    useEffect(() => {
        fetchNWSAlerts()
            .then(data => setNwsAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
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