import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './BaseLayout/BaseLayout'
import HomePage from './HomePage/HomePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import CivicEngage from './CivicEngage/CivicEngage'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="civicengage" element={<CivicEngage />} />
        </Route>
      </Routes>
    </Router>
  )
}