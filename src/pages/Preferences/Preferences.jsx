import { supabase } from "../../api"
import { useEffect, useState, useRef } from "react"
import { useAuth } from "../Auth/AuthProvider"
import Error from "../../components/Error/Error"
import Info from "../../components/Info/Info"
import "./Preferences.scss"
import { FaPlus } from "react-icons/fa"
import Webhook from "../../components/Webhook/Webhook"
import { BsCloudUpload } from "react-icons/bs"

export default function Preferences() {

    // user data
    const { user, isLoading } = useAuth()

    // preferences state
    const [preferences, setPreferences] = useState([])
    const [updateCheckbox, setUpdateCheckbox] = useState(false)
    const initialPreferencesRef = useRef([])

    // info/error state
    const [showError, setShowError] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [error, setError] = useState("There has been an error.")
    const [info, setInfo] = useState("There is no more information at this time.")

    // webhook state
    const [webhooks, setWebhooks] = useState([])
    const [showInputBox, setShowInputBox] = useState(false)
    const [webhookText, setWebhookText] = useState("")
    const [channelName, setChannelName] = useState("")

    function displayError(message) {
        setError(message)
        setShowError(true)
    }

    function displayInfo(message) {
        setInfo(message)
        setShowInfo(true)
    }

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
        setShowError(false)
        setShowInfo(false)
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
        for (const update of updates) {
            const { error }  = await supabase
            .from('user_alert_types')
            .insert({user_id: user.id, alert_type_id: update.id})
            if (error) {
                isError = true
                console.error(error.message)
                displayError(error.message)
            }
            console.log("updated")
        }

        for (const del of deletes) {
            const res = await supabase
            .from('user_alert_types')
                .delete()
                .eq('user_id', user.id)
                .eq('alert_type_id', del.id)
            if (res.status !== 204) {
                isError = true
                console.log("Error: ", res)
                displayError(error.message)
            }
            console.log("deleted")
        }

        if (!isError) {
            console.log("finished")
            displayInfo("Preferences updated successfully.")
            getPreferenceTypes()
        }
    }
    
    async function getWebhooks() {
        // call supabase to get updated webhooks and store them in state
        console.log("getting webhooks")
        console.log(user.id)
        const { data, error } = await supabase.from('user_integrations').select('teams_webhook, channel_name, id').eq('user_id', user.id)
        if (error) {
            console.log(error.message)
        } else {
            setWebhooks(data)
        }
    }

    async function addWebhook() {
        // call supabase to add webhook
        console.log("adding webhook")
        const { data, error } = await supabase.from('user_integrations').insert({teams_webhook: webhookText, channel_name: channelName})
        if (error) {
            console.log(error.message)
        } else {
            console.log(data)
            getWebhooks()
        }
        setShowInputBox(false)
        setChannelName("")
        setWebhookText("")
    }

    useEffect(() => {
        getPreferenceTypes()
        getWebhooks()
    }, [isLoading])
    
    
    
    const preferencesList = preferences.map((item, index) => 
        <li key={item.id}>
            <label>
                {`${item.type}`}
                <input name={index} type="checkbox" checked={item.is_selected} onChange={handleCheck} />
            </label>
        </li>
    )

    const webHookList = webhooks.map((hookObj, index) => {
        return <Webhook 
            id={hookObj.id}
            webhook={hookObj.teams_webhook} 
            channel_name={hookObj.channel_name}
            update={getWebhooks}
            key={index}
        />
    })

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
        {
            showError ? (
                <Error style={{maxWidth: 300, marginBottom: 10}}>{error}</Error>
            ) : null
        }
        {
            showInfo ? (
                <Info style={{maxWidth: 300, marginBottom: 10}}>{info}</Info>
            ) : null
        }
        <button type="submit" >
            Update preferences

        </button>
    </form>
    <div className="teams-section">
        <div>
        <h2>Teams Integration</h2>
        <hr />
        <h4>Webhook URLs</h4>
        <p>
            To integrate your alerts into Microsoft Teams you'll need to provide a <span>Webhook URL</span>. This URL 
            is a unique identifier for your Teams Channel, and it allows CCAS to send cards directly to Teams. 
        </p>
        <h4>Creating a Webhook URL</h4>
        {/* make sure to add: how to add workflows app to teams */}
        <p>
            To create a webhook for your channel go
            the channel you want to add, and click the three dots in the top right corner. Then click through <span>Workflows 
            &gt; More Workflows</span> and select <span>Post to a channel when a Webhook request is received</span>. Enter any name
            you like, and then select your desired team and channel. You should then see <span>Workflow added successfully!</span>, along with
            a URL. Copy that url, click Add Channel, paste the link and click Save. Now your alerts will be posted directly to your channel in Microsoft Teams!
        </p>
        </div>
    </div>
    <div className="teams-section">
        <div>
            <h2>Current Channels</h2>
            <hr />
            <div className="webhooks">
                <button className="add-webhook-btn" onClick={() => setShowInputBox(prev => !prev)}>
                    <FaPlus />
                    Add channel
                </button>
                <ul>
                    {webHookList}
                </ul>
                {
                    showInputBox ? (
                    <div className="add-channels">
                        <input 
                            className="name-input"
                            placeholder="Channel name"
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <input 
                            className="webhook-input"
                            placeholder="Webhook URL"
                            onChange={(e) => setWebhookText(e.target.value)}
                        />
                        <button className="save-btn" onClick={addWebhook}>
                            Save
                            <BsCloudUpload />
                        </button>
                    </div>
                    ) : null
                }
            </div>
        </div>
    </div>
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