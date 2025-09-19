export default function DropdownItem({ children, ...rest }) {
    return (
        <li>
            <button className="dropdown-item" {...rest}>{children}</button>
        </li>
    )
}