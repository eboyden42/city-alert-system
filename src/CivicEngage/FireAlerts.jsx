import React, { useEffect, useState } from 'react'
import AlertCard from '../components/AlertCard/AlertCard'
import { fetchFireAlerts } from '../api'

export default function FireAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetchFireAlerts()
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="fire-alerts">
            {
                alerts.length === 0 ? <h5>No fire alerts at this time.</h5> :
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}