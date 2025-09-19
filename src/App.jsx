import { useState, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { getSession, supabase } from './api'
import { useAuth } from "./pages/Auth/AuthProvider"

function App() {

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
