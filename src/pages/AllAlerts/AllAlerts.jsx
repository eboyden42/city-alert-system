import { useState, useEffect } from 'react'
import './AllAlerts.scss'
import { fetchAllAlerts } from '../../api'
import AlertCard from '../../components/AlertCard/AlertCard'

export default function AllAlerts() {
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        fetchAllAlerts()
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    console.log(alerts)

    return (
        <div className="all-alerts-page">
            <h1>All Alerts</h1>
            <hr />
            <p>This page is designed to query all alerts from the database to show database functionality as it expands.</p>
            <div className="alerts-container">
                {alerts.length === 0 ? (
                    <p>Loading alerts...</p>
                ) : (
                    alerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))
                )}
            </div>
        </div>
    )
}