import { supabase } from "../../api"
import { useEffect, useState } from "react"
import { useAuth } from "../Auth/AuthProvider"

export default function Preferences() {

    const { user, isLoading } = useAuth()
    const [preferences, setPreferences] = useState([])

    async function getPreferenceTypes() {
        const {data, error} = await supabase.rpc('gettypesforuser', {'user_uuid': user.id})
        if (error) {
            console.error(error.message)
        } else {
            setPreferences(data)
        }
    }

    useEffect(() => {
        getPreferenceTypes()
    }, [isLoading])

    const preferencesList = preferences.map((item, index) => <li key={index}>{`${item.type}: ${item.is_selected}`}</li>)

    return <>
    <h2>
        Preferences
    </h2>
    <hr />
    <p>
        Specify the types of alerts you'd like to receive below. Alerts are sourced from public RSS feeds, local news, and national weather service data.
    </p>
    <ul>
        {preferencesList}
    </ul>
    </>
    
}


/* 

SELECT
at.id, 
at.type,
CASE
  WHEN uat.alert_type_id IS NOT NULL THEN TRUE
  ELSE FALSE
END
AS is_selected
FROM alert_types at
LEFT JOIN user_alert_types uat
ON at.id = uat.alert_type_id
AND uat.user_id = user_uuid;

*/