// file for agregating fetches to backend

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE_URL}${path}`, options)
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    return res.json()
}

export function fetchFireAlerts() {
    return request("/fire")
}

export function fetchTrafficAlerts() {
    return request("/traffic")
}

export function fetchUtilitiesAlerts() {
    return request("/utilities")
}

export function fetchPoliceAlerts() {
    return request("/police")
}

export function fetchNWSAlerts() {
    return request("/nws")
}

export function fetchAirNowAlerts() {
    return request("/airnow")
}