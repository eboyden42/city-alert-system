import { useAuth } from "../../pages/Auth/AuthProvider"
import { RiDeleteBin5Line } from "react-icons/ri"
import { supabase } from "../../api"
import "./Webhook.scss"

export default function Webhook({id, webhook, channel_name, update}) {

    const { user } = useAuth()

    async function handleDelete() {
        // delete the webhook integration
        console.log("deleting ", id)
        const { data, error } = await supabase.from('user_integrations').delete().eq('id', id)
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
        update()
    }

    const shortUrl = webhook.slice(0, 100)+"..."

    return (
        <li key={id} className="previous-webhook">
            <div>
                {channel_name}
            </div>
            <div className="url-container">
                <span>
                    {shortUrl}
                </span>
            </div>
            <button onClick={handleDelete} className="delete-btn">
                <RiDeleteBin5Line />
            </button>
        </li>
    )
}