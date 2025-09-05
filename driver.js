import { supabase } from "./supabase-client.js"

export async function addAlert(alert) {
    const {error} = await supabase.from("alerts").insert(alert)
    if (error) {
        console.error(error.message)
    } else {
        console.log("Successfully added alert to supabase...")
    }
}