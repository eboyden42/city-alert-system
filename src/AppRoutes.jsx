import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './BaseLayout/BaseLayout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import CivicEngage from './pages/CivicEngage/CivicEngage'
import PoliceAlerts from './pages/CivicEngage/PoliceAlerts'
import FireAlerts from './pages/CivicEngage/FireAlerts'
import TrafficAlerts from './pages/CivicEngage/TrafficAlerts'
import UtilitiesAlerts from './pages/CivicEngage/UtilitiesAlerts'
import NWSPage from './pages/NWSPage/NWSPage'
import AirNowPage from './pages/AirNowPage/AirNowPage'
import AllAlerts from './pages/AllAlerts/AllAlerts'
import Auth from "./pages/Auth/Auth"
import PrivateRoute from './pages/Auth/PrivateRoute'
import Preferences from "./pages/Preferences/Preferences"
import AuthProvider from './pages/Auth/AuthProvider'
import Profile from "./pages/Profile/Profile"

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="civicengage" element={<CivicEngage />} >
            <Route path="police" element={<PoliceAlerts />} />
            <Route path="fire" element={<FireAlerts />} />
            <Route path="traffic" element={<TrafficAlerts />} />
            <Route path="utilities" element={<UtilitiesAlerts />} />
          </Route>
          <Route path="nws" element={<NWSPage />} />
          <Route path="airnow" element={<AirNowPage />} />
          <Route path="allalerts" element={<AllAlerts />} />
          <Route path="auth" element={<Auth />} />
          <Route element={<PrivateRoute />} >
            <Route path="preferences" element={<Preferences />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  )
}