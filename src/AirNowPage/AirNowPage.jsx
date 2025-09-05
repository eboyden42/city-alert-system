import "./AirNowPage.scss"
import { useEffect, useState } from "react"
import AlertCard from "../components/AlertCard/AlertCard"

export default function AirNowPage() {

    const [airNowAlerts, setAirNowAlerts] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/airnow`)
            .then(res => res.json())
            .then(data => setAirNowAlerts(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="airnow-page">
            <h2>Latest Air Quality Alerts</h2>
            {
                airNowAlerts.length == 0 ? <h5>No air quality alerts at this time.</h5> :
                airNowAlerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}