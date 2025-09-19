import { createContext, useContext, useState, useEffect, useRef } from "react"
import "./Dropdown.scss"

const DropdownContext = createContext({
    open: false,
    setOpen: () => {},
})

export default function Dropdown({ children, ...rest}) {
    const [open, setOpen] = useState(false)
    const dropwdownRef = useRef(null)

    useEffect(() => {
        function close(e) {
            if (!dropwdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        if (open) {
            window.addEventListener("click", close)
        }
    
        return function removeListener() {
            window.removeEventListener("click", close)
        }
    }, [open])

    return (
        <DropdownContext.Provider value={{open, setOpen}} >
            <div className="relative" ref={dropwdownRef} {...rest}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

export function useDropdown() {
    return useContext(DropdownContext)
}