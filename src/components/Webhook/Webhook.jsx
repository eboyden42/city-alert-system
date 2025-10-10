import { useAuth } from "../../pages/Auth/AuthProvider"
import { RiDeleteBin5Line } from "react-icons/ri"

export default function Webhook({id, webhook}) {

    const { user } = useAuth()

    function handleDelete() {
        // delete the webhook integration
        console.log("deleting ", id)
    }

    return (
        <li key={id} className="previous-webhook">
            {webhook}
            <button onClick={handleDelete} className="delete-btn">
                <RiDeleteBin5Line />
            </button>
        </li>
    )
}