import { useDropdown } from "./Dropdown";

export default function DropdownContent({ children }) {
    const { open } = useDropdown()

    return (
        <div className={`content ${open ? "open" : "closed"}`}>
            {children}
        </div>
    )
}