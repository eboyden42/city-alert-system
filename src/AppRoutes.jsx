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

export default function AppRoutes() {
  return (
    <Router>
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
        </Route>
      </Routes>
    </Router>
  )
}