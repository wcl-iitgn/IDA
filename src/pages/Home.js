import React from "react";
import Footer from "../components/Footer";
import dashboardImg from "../assets/images/dashboard.jpg"

const Home = () => {
  return (
    <>
      <div className="main_page_container">

        <div className="para_content">

          <div className="card_container">

            <div className="card_item">
              <div className="card_content">
                <p>Drought Atlas of India is the high-resolution (0.05°) and long-term monthly precipitation and temperature datasets for the 1901–2021 period</p>

              </div>
              <div className="card_img">
                <img src={dashboardImg} alt="dashboard-img" />

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
