import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { FaUserDoctor } from "react-icons/fa6"
import About from './About'
import Home from './Home'
import Services from './Services'
import Contact from './Contact'
import Doc from './Doc'
import Diab from './Diab'
import Heart from './Heart'
import Checkup from './Checkup'
import Gmaps from './Gmaps'
const Navbar = () => {
  return (
    <BrowserRouter>
      <nav className="bg-slate-900 text-cyan-100 flex justify-between items-center p-5 text-2xl font-mono font-bold">
        <div className="flex items-center">
          <FaUserDoctor className="mr-2 text-3xl"/>
          <span className="text-3xl">Doc</span>
        </div>
        <div className="flex gap-5">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-white')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-white')}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-white')}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-white')}>
            Contact
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Doc" element={<Doc></Doc>}></Route>
        <Route path="/Diab" element={<Diab></Diab>}></Route>
        <Route path="/Checkup" element={<Checkup></Checkup>}></Route>
        <Route path="/Map" element={<Gmaps></Gmaps>}></Route>
        <Route path="/heart" element={<Heart></Heart>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navbar
