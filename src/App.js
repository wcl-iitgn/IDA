import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavbarMain from './components/NavbarMain'
import AboutPage from './pages/AboutPage'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'


const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <Router>
       <NavbarMain/>
       <Suspense fallback={<Preloader />}>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map-viewer' element={<Dashboard/>}/>
        <Route path='/about' element={<AboutPage/>}/>
      </Routes>

      </Suspense>
        <ScrollToTop/>
    </Router>
    
  )
}

export default App