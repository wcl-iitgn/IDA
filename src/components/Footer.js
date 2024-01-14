import React from 'react'
import WCLLogo from "../assets/images/logo-2.jpg"
import { Link } from "react-router-dom";

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
                
                </div>
              </div>



            </div>
            <div className="footer-cta">
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