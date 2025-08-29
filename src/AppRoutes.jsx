import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './BaseLayout/BaseLayout'
import HomePage from './HomePage/HomePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import CivicEngage from './CivicEngage/CivicEngage'
import PoliceAlerts from './CivicEngage/PoliceAlerts'
import FireAlerts from './CivicEngage/FireAlerts'

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
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}