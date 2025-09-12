import { supabase } from "./supabase-client.js"

export async function addAlert(alert) {
    const {error} = await supabase.from("alerts").insert(alert)
    if (error) {
        console.error(error.message)
    } else {
        console.log("Successfully added alert to supabase...")
    }
}

export async function getAllAlerts() {
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

export async function signUpUser(email, password) {
    const { error } = supabase.auth.signUp({email, password})
    if (error) {
        return error
    }
}

export async function signInUser(email, password) {
    const { error } = supabase.auth.signInWithPassword({email, password})
    if (error) {
        return error
    }
}