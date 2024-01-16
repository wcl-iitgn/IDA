import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavbarMain from './components/NavbarMain'
import AboutPage from './pages/AboutPage'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'
import { AlertProvider } from './context/AlertContext'
import AlertMessage from './components/AlertMessage'


const Dashboard = lazy(() => import('./pages/Dashboard'));
const TimeseriesPage = lazy(() => import('./pages/TimeseriesPage'));

const App = () => {
  return (
    <Router>
      <AlertProvider>
       <NavbarMain/>
       <AlertMessage />
       <Suspense fallback={<Preloader />}>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map-viewer' element={<Dashboard/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/timeseries' element={<TimeseriesPage/>}/>
        
      </Routes>

      </Suspense>
        <ScrollToTop/>
        </AlertProvider>
    </Router>
    
  )
}

export default App