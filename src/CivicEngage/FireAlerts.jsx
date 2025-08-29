import React, { useEffect, useState } from 'react'
import AlertCard from '../components/AlertCard/AlertCard'

export default function FireAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/fire`)
            .then(response => response.json())
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