import React, { useEffect, useState } from 'react';
import Logo from "../assets/images/logo-2.jpg"
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaExternalLinkAlt } from "react-icons/fa";


import { Link } from 'react-router-dom';

const NavbarMain = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };



    return (
        <>
            <div className='navbar_main_container'>
                <div className='short_nav_container'>
                    <div className='logo_text'>
                        <h1>Drought Atlas of India</h1>
                    </div>
                    <div className="navbar__toggle scrolled" onClick={handleToggle}>
                        {showMenu ? <FaTimes /> : <FaBars />}
                    </div>


                </div>


                <div className='navbar_container'>

                    {/* <div className="navbar__logo">
                        <Link to="/">
                            <img src={Logo} alt="nav_logo" />
                        </Link>
                    </div> */}



                    <div className={`main_nav ${showMenu ? 'show' : ''}`}>
                        <div className="nav__content">
                            {/* <div className="main_nav_logo">
                                <Link to="/" onClick={handleLinkClick}>
                                    <img src={Logo} alt="nav_logo" />
                                </Link>
                            </div> */}

                            <div className='nav__list'>
                                <Link className="nav__item" to="/" onClick={handleLinkClick}>
                                    Home
                                </Link>

                                <Link className="nav__item" to="/map-viewer" onClick={handleLinkClick}>
                                    Map Viewer
                                </Link>

                                {/* <div className='dropdown_nav_container'>
                                    <Link className="nav__item dropdown_nav" to="#">
                                        Products  <i className="fa fa-chevron-down"></i>
                                    </Link>
                                    <div className="dropdown_content">
                                        <Link className='dropdown_link' to="/" onClick={handleLinkClick}> Basic</Link>
                                        <Link className='dropdown_link' to="/" onClick={handleLinkClick}> Premium</Link>
                                    </div>
                                </div> */}

                                <Link className="nav__item" to="/about" onClick={handleLinkClick}>
                                    About
                                </Link>

                                <a className="nav__item" href="https://vmishra.people.iitgn.ac.in/water&climate/" onClick={handleLinkClick} target='blank'>
                                    WCL&nbsp;<FaExternalLinkAlt />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default NavbarMain
