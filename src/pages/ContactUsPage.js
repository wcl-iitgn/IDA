import React from 'react'
import Footer from '../components/Footer'
import VimalMishra from '../assets/images/VimalMishra.jpeg'
import SaranAadhar from '../assets/images/SaranAadhar.jpeg'
import dipesh from '../assets/images/dipesh.jpg'
import Anuj from '../assets/images/Anuj.jpg'

const ContactUsPage = () => {
    return (
        <>
            <div className="main_page_container">
                <div className="para_content">
                    <h1>Contact US</h1>
                    <div className="section">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="contact-image">
                                    <img src={VimalMishra} alt="Vimal Mishra" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-image-caption">
                                    <p>
                                        <a href="https://scholar.google.co.in/citations?user=wq7CgpUAAAAJ&hl=en" target="_blank" rel="noreferrer noopener"> Dr. Vimal Mishra </a><br />
                                        Professor, Civil Engineering <br />IIT Gandhinagar<br />
                                        email: vmishra@iitgn.ac.in
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="contact-image">
                                    <img src={SaranAadhar} alt="Saran Aadhar" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-image-caption">
                                    <p>
                                        <a href="https://scholar.google.co.in/citations?user=2fmbJF8AAAAJ&hl=en&oi=ao" target="_blank" rel="noreferrer noopener">
                                            Dr. Saran Aadhar </a><br />
                                        Assistant Professor, Civil & Infrastructure Engineering, <br />
                                        IIT Jodhpur<br />
                                        email: saran.aadhar@iitj.ac.in
                                    </p>
                                </div>
                            </div>
       
                            <div className="col-md-3">
                                <div className="contact-image">
                                    <img src={dipesh} alt="Rajesh Singh" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-image-caption">
                                    <p>
                                        <a href="https://vmishra.people.iitgn.ac.in/water&climate/#/people/Dipesh%20Singh%20Chuphal" target="_blank" rel="noreferrer noopener">
                                            Dipesh Singh Chuphal </a><br />
                                        PhD Research Scholar, Civil Engineering, <br />
                                        IIT Gandhinagar<br />
                                        email: dipeshsc@iitgn.ac.in
                                    </p>
                                </div>
                            </div>


                            <div className="col-md-3">
                                <div className="contact-image">
                                    <img src={Anuj} alt="Aman Chaudhary" />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="contact-image-caption">
                                    <p>
                                        <a href="https://vmishra.people.iitgn.ac.in/water&climate/#/people/Anuj%20Prakash%20Kushwaha" target="_blank" rel="noreferrer noopener">
                                            Anuj Prakash Kushwaha </a><br />
                                        PhD Research Scholar, Earth Science, <br />
                                        IIT Gandhinagar<br />
                                        email: anuj.k@iitgn.ac.in
                                    </p>
                                </div>
                            </div>




                        </div>
                    </div>

                   


                </div>




            </div>

            <Footer />
        </>

    )
}

export default ContactUsPage