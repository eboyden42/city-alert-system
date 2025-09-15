import { MdError } from "react-icons/md"
import "./Error.scss"

export default function Error({ children }) {
    return (
        <div className="error">
            <MdError />
            <p>{children}</p>
        </div>
    )
}