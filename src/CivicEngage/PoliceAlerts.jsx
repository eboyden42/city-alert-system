import React, { useEffect, useState } from 'react'
import AlertCard from '../components/AlertCard/AlertCard'

export default function PoliceAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/police`)
            .then(response => response.json())
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="police-alerts">
            {
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}