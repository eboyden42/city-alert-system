import React, { useEffect, useState } from 'react'
import AlertCard from '../../components/AlertCard/AlertCard'
import { fetchTrafficAlerts } from '../../api'

export default function TrafficAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetchTrafficAlerts()
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="traffic-alerts">
            {
                alerts.length === 0 ? <h5>No traffic alerts at this time.</h5> :
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}