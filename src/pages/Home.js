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
                <p>Drought Atlas of India is the high-resolution (0.05°) and long-term monthly precipitation and temperature datasets of India for the 1901–2021 period.
                The atlas includes the taluka-wise drought condition of summer monsoon, winter monsoon, calendar year, water year, and for each month from 1901 to 2021.
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
                <p>Drought Atlas of India provids time series of average SPEI over India to assess drought occurrences during the summer monsoon season, winter monsoon, water year, and calendar year and each month from 1901 to 2021.</p>

              </div>
              <div className="card_img">
                <img src={dashboardTimeseries} alt="dashboard-img" />

              </div>

              <div className="card_btn">
                <Link to="/timeseries"> <button>Timeseries</button></Link>
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
