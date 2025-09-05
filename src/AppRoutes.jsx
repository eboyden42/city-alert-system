import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './BaseLayout/BaseLayout'
import HomePage from './HomePage/HomePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import CivicEngage from './CivicEngage/CivicEngage'
import PoliceAlerts from './CivicEngage/PoliceAlerts'
import FireAlerts from './CivicEngage/FireAlerts'
import TrafficAlerts from './CivicEngage/TrafficAlerts'
import UtilitiesAlerts from './CivicEngage/UtilitiesAlerts'
import NWSPage from './NWSPage/NWSPage'

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
        </Route>
      </Routes>
    </Router>
  )
}