import { MdError } from "react-icons/md"
import "./Info.scss"

export default function Info({ children, style }) {
    return (
        <div className="info" style={style}>
            <MdError />
            <p>{children}</p>
        </div>
    )
}