import { createClient } from "@supabase/supabase-js"


// file for agregating fetches to backend

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE_URL}${path}`, options)
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    return res.json()
}

async function getAlertByType(type) {
    const {data: alerts, error } = await supabase.from('alerts').select('*').eq('type', type)
    if (error) {
        return error
    }
    return alerts
}

export async function fetchFireAlerts() {
    return await getAlertByType('fire')
}

export async function fetchTrafficAlerts() {
    return await getAlertByType('traffic')
}

export async function fetchUtilitiesAlerts() {
    return await getAlertByType('utilities')
}

export async function fetchPoliceAlerts() {
    return await getAlertByType('police')
}

export async function fetchNWSAlerts() {
    return await getAlertByType('weather')
}

export async function fetchAirNowAlerts() {
    return await getAlertByType('air')
}

export async function fetchAllAlerts() {
    let { data: alerts, error } = await supabase
        .from('alerts')
        .select('*')
        .order('pub_date', { ascending: false })
        .limit(20)
        
    if (error) {
        console.error("Error fetching alerts:", error)
    }
    return alerts
}

export async function userSignUp(email, password) {
    const response = await supabase.auth.signUp({
        email, 
        password
    })
    return response
}

export async function userLogIn(email, password) {
    const response = await supabase.auth.signInWithPassword({
        email, 
        password,
    })
    return response
}

export async function logOut() {
    await supabase.auth.signOut()
}

export async function getSession() {
    const session = await supabase.auth.getSession()
    return session
}