import React, { useEffect, useState } from 'react'
import AlertCard from '../components/AlertCard/AlertCard'
import { fetchPoliceAlerts } from '../api'

export default function PoliceAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetchPoliceAlerts()
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="police-alerts">
            {
                alerts.length === 0 ? <h5>No police alerts at this time.</h5> :
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}