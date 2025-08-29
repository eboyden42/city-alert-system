import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './BaseLayout/BaseLayout'
import HomePage from './HomePage/HomePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  )
}