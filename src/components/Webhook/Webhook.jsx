import { useAuth } from "../../pages/Auth/AuthProvider"
import { RiDeleteBin5Line } from "react-icons/ri"
import "./Webhook.scss"

export default function Webhook({id, webhook, channel_name, update}) {

    const { user } = useAuth()

    async function handleDelete() {
        // delete the webhook integration
        console.log("deleting ", id)
        update()
    }

    const shortUrl = webhook.slice(0, 100)+"..."

    return (
        <li key={id} className="previous-webhook">
            <div>
                {channel_name}
            </div>
            <div>
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