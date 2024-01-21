import React from "react";
import Footer from "../components/Footer";
import dashboardMap from "../assets/images/dashboard-map.jpg"
import dashboardTimeseries from "../assets/images/dashboard-timeseries.jpg"

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="main_page_container">

        <div className="para_content">

          <div className="card_container">

            <div className="card_item">
              <div className="card_content">
                <p>
                Drought atlas of India is based on the high-resolution Standardised Precipitation Evapotranspiration Index (SPEI). The atlas provide glimpse of past droughts in summer monsoon, winter monsoon, calender year, and water year during 1901-2020.
                </p>

              </div>
              <div className="card_img">
                <img src={dashboardMap} alt="dashboard-img" />

              </div>

              <div className="card_btn">
                <Link to="/map-viewer"> <button>Map Viewer</button></Link>
              </div>
            </div>

          </div>
          <div className="card_container">
            <div className="card_item">
              <div className="card_content">
                <p>Drought Atlas of India provids time series of average SPEI over India to assess drought occurrences during the summer monsoon season, winter monsoon, water year, and calendar year during 1901 to 2020.</p>

              </div>
              <div className="card_img">
                <img src={dashboardTimeseries} alt="dashboard-img" />

              </div>

              <div className="card_btn">
                <Link to="/timeseries"> <button>Time Series</button></Link>
              </div>
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
