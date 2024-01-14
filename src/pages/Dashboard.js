import React, { useEffect, useState } from 'react'
import { MapContainer, GeoJSON, Pane } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import BaseMap from '../components/BaseMap';
import SearchBar from '../components/SearchBar';
import indiaDistrict from '../assets/data/indiaDistrict.json';
import Legend from '../components/Legend';


const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [droughtArea, setDroughtArea] = useState(null);
  const [droughtIntensity, setDroughtIntensity] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };


  function setInitialMapZoom() {
    var viewportWidth = window.innerWidth;
    var mapZoom;
    if (viewportWidth <= [767]) {
      mapZoom = [4];
    } if (viewportWidth >= [768]) {
      mapZoom = [4.5];
    } if (viewportWidth >= [1600]) {
      mapZoom = [5];
    }
    return mapZoom;
  }

  useEffect(() => {
    if (selectedSession && selectedYear) {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          // Fetching data from the API
          const response = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/${selectedSession}.json`);
          const droughtData = await response.json();
  
          // Fetching area data from the API
          const areaResponse = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/Area.json`);
          const droughtArea = await areaResponse.json();
  
          // Fetching intensity data from the API
          const intensityResponse = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/Intensity.json`);
          const droughtIntensity = await intensityResponse.json();
  
          const filteredDroughtArea = droughtArea.filter(data => data.Year === parseInt(selectedYear) && data[selectedSession]);
          const filteredDroughtIntensity = droughtIntensity.filter(data => data.Year === parseInt(selectedYear) && data[selectedSession]);
  
          if (filteredDroughtArea.length > 0) {
            const selectedDroughtValue = filteredDroughtArea[0][selectedSession];
  
            if (selectedDroughtValue !== undefined) {
              setDroughtArea(selectedDroughtValue);
            } else {
              setDroughtArea(null);
            }
          } else {
            setDroughtArea(null);
          }
  
          if (filteredDroughtIntensity.length > 0) {
            const selectedIntensityValue = filteredDroughtIntensity[0][selectedSession];
  
            if (selectedIntensityValue !== undefined) {
              setDroughtIntensity(selectedIntensityValue);
            } else {
              setDroughtIntensity(null);
            }
          } else {
            setDroughtIntensity(null);
          }
  
          setSelectedData(droughtData);
          setLoading(false);
  
        } catch (error) {
          console.error("Error fetching and filtering wind data:", error);
        }
      };
      fetchData();
    }
  }, [selectedSession, selectedYear]);
  




  function DistrictOnEachfeature(feature, layer) {
    layer.on('mouseover', function (e) {
      const summerDataItem = selectedData.find(item => item.ID === feature.properties.ID.toString());
      if (selectedYear && feature.properties && feature.properties.ID) {
        const popupContent = `
          <div>
            DISTRICT: ${feature.properties.District}<br/>
            STATE: ${feature.properties.STATE}<br/>
            TEHSIL: ${feature.properties.TEHSIL}<br/>
            VALUE: ${summerDataItem ? summerDataItem[`Y${selectedYear}`] : null}
          </div>
        `;
        layer.bindTooltip(popupContent, { sticky: true });
      }
      layer.openTooltip();
    });

    layer.on('mouseout', function () {
      layer.closeTooltip();
    });
  }



  const DistrictDensity = (density => {
    return density > -0.5
      ? 'white'
      : density > -0.8
        ? 'yellow'
        : density > -1.3
          ? 'rgb(252, 214, 148)'
          : density > -1.6
            ? 'orange'
            : density > -2
              ? 'red'
              : density > -3
                ? 'brown'
                : 'none';
  })




  const DistrictStyle = (feature => {
    if (selectedYear) {
      const getDensityFromSummerData = (id) => {
        const summerDataItem = selectedData.find(item => item.ID === id.toString());
        return summerDataItem ? summerDataItem[`Y${selectedYear}`] : null;

      };

      const density = getDensityFromSummerData(feature.properties.ID);
      return ({
        fillColor: DistrictDensity(density),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 1
      });

    }


  });







  // const DistrictStyle = (feature => {
  //   return ({
  //     fillColor: DistrictDensity(feature.properties.ID),
  //     weight: 1,
  //     opacity: 1,
  //     color: 'black',
  //     dashArray: '2',
  //     fillOpacity: 1
  //   });
  // });

  return (
    <div className='dasboard_page_container'>

      <div className='main_dashboard'>
        <div className='left_panel'>
        <div className='border border-secondary p-2 mb-2'>
            <label className="form-label">Select Year</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="none">Select</option>
              {Array.from({ length: 2021 - 1900 }, (_, index) => (
                <option key={`${1901 + index}`} value={`${1901 + index}`}>
                  {1901 + index}
                </option>
              ))}
            </select>
          </div>

          <div className='border border-secondary p-2 mb-2'>
            <label className="form-label">Select Session</label>
            <select
              className="form-select mb-3"
              value={selectedSession}
              onChange={handleSessionChange}
              aria-label="Default select example">
              <option defaultValue="none">Select</option>
              <option value="Summer_Monsoon">Summer Monsoon</option>
              <option value="Winter_Monsoon">Winter Monsoon</option>
              <option value="Calendar_Year">Calendar year</option>
              <option value="Water_Year">Water year</option>
            </select>

            <label className="form-label">Or</label><br />
            <label className="form-label">Select Month</label>
            <select
              className="form-select mb-3"
              value={selectedSession}
              onChange={handleSessionChange}
              aria-label="Default select example">
              <option defaultValue="none">Select</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>

            </select>

          </div>

          

        </div>

        {selectedSession && selectedYear && selectedData && (
          <>

            <div className='drought_details_container_mobile'>
              <div className='border border-secondary p-2'>
                <p><strong> Selected Year: </strong> {selectedYear}</p>
                <p><strong>Selected Session/Month: </strong>{selectedSession}</p>
                <p><strong>Drought Area: </strong>{droughtArea} Mkm<sup>2</sup></p>
                <p><strong>Mean Intensity: </strong>{droughtIntensity}</p>
              </div>
            </div>
          </>


        )}

        <div className='right_panel'>

          <MapContainer
            center={[23, 82]}
            style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
            zoom={setInitialMapZoom()}
            zoomDelta={0.25}
            zoomSnap={0}
            // maxZoom={8}
            // minZoom={4}
            // attributionControl={false}
            scrollWheelZoom={false}
          >
            <SearchBar />



            {selectedSession && selectedYear && selectedData && (
              <>
                <div className='drought_details_container_desktop'>
                  <p><strong> Selected Year: </strong> {selectedYear}</p>
                  <p><strong>Selected Session/Month: </strong>{selectedSession}</p>
                  <p><strong>Drought Area: </strong>{droughtArea} Mkm<sup>2</sup></p>
                  <p><strong>Mean Intensity: </strong>{droughtIntensity}</p>
                </div>


                <GeoJSON
                  style={DistrictStyle}
                  data={indiaDistrict.features}
                  onEachFeature={DistrictOnEachfeature}
                />

                <div className="legend-panel-desktop">
                  <Legend />
                </div>
              </>


            )}


            <BaseMap />

          </MapContainer>


          <div className="legend-panel-mobile">
            <Legend />
          </div>


          {loading && (
            <div className='map_layer_loader_container'>
              <div className="map_loader_container">
                <span className="map_loader"></span>
              </div>

            </div>

          )}

        </div>







      </div>

    </div>
  )
}

export default Dashboard