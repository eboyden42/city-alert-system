import { useDropdown } from "./Dropdown"

export default function DropdownButton({ children }) {

    const { open, setOpen } = useDropdown()

    function toggle() {
        setOpen(prev => !prev)
    }

    return (
        <button onClick={toggle} className="dropdown-btn">
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={15} height={15} strokeWidth={4} stroke="currentColor" className={`dropdown-icon ${open ? "rotate-open" : "rotate-closed"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    )
}