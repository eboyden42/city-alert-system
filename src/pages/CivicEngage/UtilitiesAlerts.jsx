import React, { useEffect, useState } from 'react'
import AlertCard from '../../components/AlertCard/AlertCard'
import { fetchUtilitiesAlerts } from '../../api'
    
export default function UtilitiesAlerts() {
    const [alerts, setAlerts] = useState([])
    
    useEffect(() => {
        fetchUtilitiesAlerts()
            .then(data => setAlerts(data))
            .catch(error => console.error("Error fetching alerts:", error))
    }, [])

    return (
        <div className="utilities-alerts">
            {
                alerts.length === 0 ? <h5>No utilities alerts at this time.</h5> :
                alerts.map((alert, index) => (
                    <AlertCard key={index} alert={alert} />
                ))
            }
        </div>
    )
}