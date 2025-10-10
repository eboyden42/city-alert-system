import { supabase } from "../../api"
import { useEffect, useState, useRef } from "react"
import { useAuth } from "../Auth/AuthProvider"

export default function Preferences() {

    const { user, isLoading } = useAuth()
    const [preferences, setPreferences] = useState([])
    const [updateCheckbox, setUpdateCheckbox] = useState(false)
    const initialPreferencesRef = useRef([])

    async function getPreferenceTypes() {
        const {data, error} = await supabase.rpc('gettypesforuser', {'user_uuid': user.id})
        if (error) {
            console.error(error.message)
        } else {
            initialPreferencesRef.current = data
            setPreferences(data)
        }
    }

    function handleCheck(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = Number(target.name);
        setPreferences(values => {
            const newValues = values.map((item, index) => 
                index === name ? {...item, is_selected: value} : item
            )
           return newValues
        })
        setUpdateCheckbox(prev => !prev)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const initialPreferences = initialPreferencesRef.current
        // compare initialPreferences to preferences
        let updates = []
        let deletes = []
        for (let i = 0; i < initialPreferences.length; ++i) {
            if (initialPreferences[i].is_selected !== preferences[i].is_selected) {
                if (preferences[i].is_selected) {
                    updates.push(preferences[i])
                } else {
                    deletes.push(preferences[i])
                }
            }
        }

        let isError = false

        // send any differing updates/deletes to supabase
        updates.forEach(async update => {
            const { error }  = await supabase
                .from('user_alert_types')
                .insert({user_id: user.id, alert_type_id: update.id})
            if (error) {
                isError = true
                console.error(error.message)
            }
        })

        deletes.forEach(async del => {
            const res = await supabase
                .from('user_alert_types')
                .delete()
                .eq('user_id', user.id)
                .eq('alert_type_id', del.id)
            if (res.status !== 204) {
                isError = true
                console.log("Error: ", res)
            }
        })

        if (!isError) {
            console.log("Success!")
        }
    }

    useEffect(() => {
        getPreferenceTypes()
    }, [isLoading])

    const preferencesList = preferences.map((item, index) => 
        <li key={item.id}>
            <label>
                {`${item.type}`}
                <input name={index} type="checkbox" checked={item.is_selected} onChange={handleCheck} />
            </label>
        </li>
    )

    return <>
    <h2>
        Preferences
    </h2>
    <hr />
    <p>
        Specify the types of alerts you'd like to receive below. Alerts are sourced from public RSS feeds, local news, and national weather service data.
    </p>
    <form onSubmit={handleSubmit}>
        <ul>
            {preferencesList}
        </ul>
        <button type="submit" >Submit</button>
    </form>
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