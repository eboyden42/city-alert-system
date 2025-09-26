import { MdError } from "react-icons/md"
import "./Info.scss"

export default function Info({ children }) {
    return (
        <div className="info">
            <MdError />
            <p>{children}</p>
        </div>
    )
}