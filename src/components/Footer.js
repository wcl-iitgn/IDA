import React from 'react'
import WCLLogo from "../assets/images/logo-2.jpg"
import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {

  return (
    <div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-cta">
          </div>
          <div className="footer-content">


            <div className="footer-widget">
              <div className="footer-logo">
                <img src={WCLLogo} className="img-fluid" alt="logo" />
              </div>
              <div className="footer-text">
                <p>Water and Climate Lab,<br />
                  AB-4/326,<br />
                  Indian Institute of Technology Gandhinagar.<br />
                  Palaj, Gandhinagar, Gujarat, PIN - 382355.</p>
                  <p><a href='https://clustrmaps.com/site/1by8e' target="_blank" rel="noreferrer">Website Visitors <FaExternalLinkAlt/></a></p>

              </div>
            </div>



          </div>
          <div className="footer-cta">
            <div style={{ display: "none" }}>

            <a href="https://clustrmaps.com/site/1by8e"  title="Visit tracker">
              <img src="//www.clustrmaps.com/map_v2.png?d=zNzFcEcqWq6c1Xwy2x6RUJ2uRg9mdae-FKKa0GVhMt4&cl=ffffff" alt="Visitor map" /></a>

            </div>

          </div>

        </div>


        <div className="copyright_container">
          <div className="copyright-text">
            <p>&copy; 2024 Water & Climate Lab. All rights reserved</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer