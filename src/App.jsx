import { useState, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { getSession } from './api'

function App() {

  const [session, setSession] = useState(null)

  async function getCurrentSession() {
    const currentSession = await getSession();
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    getCurrentSession()
  }, [])

  if (session) {
    console.log(session)
  }

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
