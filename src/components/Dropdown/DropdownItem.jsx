export default function DropdownItem({ children, ...rest }) {
    return (
        <li>
            <button className="dropdown-item" {...rest} data-testid="dropdown-item" >{children}</button>
        </li>
    )
}