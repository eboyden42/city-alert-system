import { useDropdown } from "./Dropdown";

export default function DropdownContent({ children }) {
    const { open } = useDropdown()

    return (
        <div className={`content ${open ? "open" : "closed"}`} data-testid="dropdown-content">
            {children}
        </div>
    )
}