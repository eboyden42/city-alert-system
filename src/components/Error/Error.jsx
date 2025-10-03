import { MdError } from "react-icons/md"
import "./Error.scss"

export default function Error({ children, style }) {
    return (
        <div className="error" style={style} >
            <MdError />
            <p>{children}</p>
        </div>
    )
}