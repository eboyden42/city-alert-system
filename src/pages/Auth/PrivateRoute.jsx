import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router"
import { useAuth } from "./AuthProvider"

export default function PrivateRoute() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        return <Navigate to="/auth" />
    }

    return <Outlet />
}