import React from 'react'
import Footer from '../components/Footer'

const AboutPage = () => {
    return (
        <>
            <div className="main_page_container">
                <div className="para_content">
                    <h1>About</h1>
                    <p>
                        This is a high-resolution (0.05°) standardized precipitation and evapotranspiration index (SPEI) based drought product for India from 1901 to 2021. In India, recurrent droughts during the summer monsoon season, caused by inadequate rainfall, have led to cascading effects on hydrology and agriculture. Despite the significant repercussions on water resources and farming, there has been a lack of comprehensive datasets to analyze and understand past droughts at appropriate scales. Existing data often cover only limited periods and coarse resolutions, thus missing crucial historical droughts for informed decision-making. To fill this critical gap, we developed the high-resolution (0.05°) and long-term monthly precipitation and temperature datasets for the 1901-2021 period. We used long-term high-resolution precipitation and temperature to develop SPEI based drought product for India. We developed a drought atlas for India (1901-2020) using the high-resolution SPEI. The atlas can provide comprehensive information on drought occurrence, impacts, and risks in India, which can be used for policy and decision-making.
                    </p>


                    <h1>Dataset Citation</h1>
                    <p>
                        If you would like to use any of the data from the Drought Atlas of India, please cite the following source:
                    </p>
                    <ul>
                        <li>Chuphal, D. S., Kushwaha, A. P., Aadhar, S. & Mishra, V. Drought Atlas of India, 1901-2020. Zenodo (2023)  <a href='https://doi.org/10.5281/zenodo.8280551' target='_blank' rel="noreferrer noopener"> https://doi.org/10.5281/zenodo.8280551</a> </li>
                        <li>Chuphal, D. S., Kushwaha, A. P., Aadhar, S., & Mishra, V. (2024). Drought Atlas of India, 1901–2020. Scientific Data, 11(1), 7. <a href='https://doi.org/10.1038/s41597-023-02856-y' target='_blank' rel="noreferrer noopener"> https://doi.org/10.1038/s41597-023-02856-y</a></li>
                    </ul>


                </div>




            </div>

            <Footer />
        </>

    )
}

export default AboutPage