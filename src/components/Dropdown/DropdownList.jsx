import { useDropdown } from "./Dropdown";

export default function DropdownList({ children, ...rest }) {
    const { setOpen } = useDropdown()

    return (
        <ul onClick={() => setOpen(false)} className="dropdown-ul" {...rest} data-testid="dropdown-list" >
            {children}
        </ul>
    )
}