import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { Autocomplete, TextField } from "@mui/material";
import BaseMap from '../components/BaseMap';
import SearchBar from '../components/SearchBar';
import indiaDistrict from '../assets/data/indiaDistrict.json';
import Legend from '../components/Legend';
import indiastates from '../assets/data/indiaStates.json';
import PlaceAttributes from "../assets/data/PlaceAttributes.json";
import { Box } from "@mui/system";
import FiltererdJsonData from './FiltererdJsonData';
import ExportMapButton from './ExportMapButton';



const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [droughtArea, setDroughtArea] = useState(null);
  const [droughtIntensity, setDroughtIntensity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [districtList, setDistrictList] = useState([]);
  const [filteredIndiaDistrict, setFilteredIndiaDistrict] = useState(null);
  const [tehsilList, setTehsilList] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState([]);

  const mapContainerRef = useRef(null);





  const handleStateSelect = (event, value) => {
    let items = PlaceAttributes.filter((item) => item.STATE === value);
    items = [...new Set(items.map((item) => item))];
    items.sort();

    setDistrictList(items);
    setSelectedState(value)

 


    // Filter indiaDistrict features based on the selected state
    let filteredStateFeatures = indiaDistrict.features.filter((feature) => feature.properties.STATE === value);

    // const bounds = filteredStateFeatures.reduce((acc, feature) => {
    //   const coordinates = feature.geometry.coordinates[0];
    //   return acc.extend(coordinates);
    // }, new L.LatLngBounds());

    setFilteredIndiaDistrict({
      type: "FeatureCollection",
      features: filteredStateFeatures,
    });

    // mapRef.current.flyToBounds(bounds, { padding: [10, 10] });

    

  };





  const handleDistrictSelect = (event, value) => {
    let items = districtList.filter((item) => item.DISTRICT === value);
    items = [...new Set(items.map((item) => item))];
    items.sort();

    setTehsilList(items);
    setSelectedDistrict(value)

    let filteredDistrictFeatures = indiaDistrict.features.filter((feature) => feature.properties.DISTRICT === value && feature.properties.STATE === selectedState);

    setFilteredIndiaDistrict({
      type: "FeatureCollection",
      features: filteredDistrictFeatures,
    });

  };

  const handleTehsilSelect = (event, value) => {
    setSelectedTehsil(value)

    let filteredTehsilFeatures = indiaDistrict.features.filter((feature) => feature.properties.TEHSIL === value && feature.properties.DISTRICT === selectedDistrict && feature.properties.STATE === selectedState);
    setFilteredIndiaDistrict({
      type: "FeatureCollection",
      features: filteredTehsilFeatures,
    });
  };


  const handleYearChange = (event, value) => {
    setSelectedYear(value);
  };


  const handleSessionChange = (event, value) => {
    setSelectedSession(value);
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

  const setDragging = () => {
    var viewportWidth = window.innerWidth;
    var dragging;
    if (viewportWidth <= [767]) {
      dragging = false;
    } if (viewportWidth >= [768]) {
      dragging = true;
    }
    return dragging;
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
            DISTRICT: ${feature.properties.DISTRICT}<br/>
            STATE: ${feature.properties.STATE}<br/>
            TEHSIL: ${feature.properties.TEHSIL}<br/>
            VALUE: ${summerDataItem ? summerDataItem[selectedYear] : null}
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
        return summerDataItem ? summerDataItem[selectedYear] : null;

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
            <Autocomplete
              onChange={(event, value) => handleYearChange(event, value)}
              id="year"
              options={Array.from({ length: 2020 - 1900 }, (_, index) => `${1901 + index}`)}
              noOptionsText="No Available Data"
              renderOption={(props, year) => (
                <Box component="li" {...props} key={year}
                  sx={{
                    fontSize: "14px",
                  }}>
                  {year}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Year"
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedYear}
                />
              )}
            />

          </div>

          <div className='border border-secondary p-2 mb-2'>
            <Autocomplete
              onChange={handleSessionChange}
              id="session"
              options={[
                "Summer_Monsoon",
                "Winter_Monsoon",
                "Calendar_Year",
                "Water_Year",
              ]}
              renderInput={(params) => (
                <TextField {...params} className="form-select mb-3" label="Select Season" />
              )}
            />

            <label className="form-label">or</label><br />

            <Autocomplete
              onChange={handleSessionChange}
              id="month"
              options={[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ]}
              renderInput={(params) => (
                <TextField {...params} className="form-select mb-3" label="Select Month" />
              )}
            />
          </div>

          <div className='border border-secondary p-2 mb-2'>
          <label className="form-label">Filter Data:</label>

            <Autocomplete
              style={{ marginBottom: "20px" }}
              onChange={(event, value) => handleStateSelect(event, value)}
              id="state"
              getOptionLabel={(state) => `${state}`}
              options={[...new Set(PlaceAttributes.map((item) => item.STATE))]}
              isOptionEqualToValue={(option, value) => option.Name === value.Name}
              noOptionsText={"No Available Data"}
              // disabled={!selectedData}
              renderOption={(props, state) => (
                <Box component="li" {...props} key={state}
                  sx={{
                    fontSize: "14px",
                  }}>
                  {state}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Search State" />}
            />

            <Autocomplete
              style={{ marginBottom: "20px" }}
              onChange={(event, value) => handleDistrictSelect(event, value)}
              id="district"
              getOptionLabel={(district) => `${district}`}
              options={[...new Set(districtList.map((item) => item.DISTRICT))]}
              isOptionEqualToValue={(option, value) => option.Name === value.Name}
              noOptionsText={"No Available Data"}
              disabled={districtList.length === 0}
              renderOption={(props, district) => (
                <Box component="li" {...props} key={district}
                  sx={{
                    fontSize: "14px",
                  }}>
                  {district}
                </Box>
              )}
              renderInput={(params) => <TextField {...params}

                label="Search District" />}
            />

            <Autocomplete
              onChange={(event, value) => handleTehsilSelect(event, value)}
              id="tehsil"
              disabled={tehsilList.length === 0}
              getOptionLabel={(tehsil) => `${tehsil}`}
              options={[...new Set(tehsilList.map((item) => item.TEHSIL))]}
              isOptionEqualToValue={(option, value) => option.Name === value.Name}
              noOptionsText={"No Available Data"}
              renderOption={(props, tehsil) => (
                <Box component="li" {...props} key={tehsil}
                  sx={{
                    fontSize: "14px",
                  }}>
                  {tehsil}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Search Tehsil" />}
            />

          </div>



        </div>

        {selectedSession && selectedYear && selectedData && (
          <>

            <div className='drought_details_container_mobile'>
              <div className='border border-secondary p-2'>
                <p><strong> Selected Year: </strong> {selectedYear}</p>
                <p><strong>Selected Season/Month: </strong>{selectedSession}</p>
                <p><strong>Drought Area (All India): </strong>{droughtArea} Mkm<sup>2</sup></p>
                <p><strong>Mean Intensity (All India): </strong>{droughtIntensity}</p>
              </div>
            </div>
          </>


        )}

        <div className='right_panel' ref={mapContainerRef}>

          <MapContainer
            fullscreenControl={true}
            center={[23, 84]}
            style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
            zoom={setInitialMapZoom()}

            // maxZoom={8}
            minZoom={setInitialMapZoom()}
            keyboard={false}
            dragging={setDragging()}
            // attributionControl={false}
            // scrollWheelZoom={false}
            doubleClickZoom={false}
          >
            <SearchBar />
            <ExportMapButton mapContainerRef={mapContainerRef} />








            {selectedSession && selectedYear && selectedData && (
              <>
                <div className='drought_details_container_desktop'>
                  <p><strong> Selected Year: </strong> {selectedYear}</p>
                  <p><strong>Selected Season/Month: </strong>{selectedSession}</p>
                  <p><strong>Drought Area (All India): </strong>{droughtArea} Mkm<sup>2</sup></p>
                  <p><strong>Mean Intensity (All India): </strong>{droughtIntensity}</p>
                </div>

                {filteredIndiaDistrict ? (
                  <FiltererdJsonData selectedState={selectedState}
                  selectedDistrict={selectedDistrict}
                  selectedTehsil={selectedTehsil}
                  DistrictStyle={DistrictStyle}
                  filteredIndiaDistrict={filteredIndiaDistrict}
                  DistrictOnEachfeature={DistrictOnEachfeature}/>
                  

                ) : (
                  <GeoJSON
                    style={DistrictStyle}
                    data={indiaDistrict.features}
                    onEachFeature={DistrictOnEachfeature}
                  />

                )}











                <GeoJSON data={indiastates.features} style={{
                  fillColor: 'none',
                  weight: 2,
                  color: 'black',
                  interactive: false
                }} />


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
            <div className='map_layer_loader_container_desktop'>
              <div className="map_loader_container">
                <span className="map_loader"></span>
              </div>

            </div>

          )}

        </div>


        {loading && (
          <div className='map_layer_loader_container_mobile'>
            <div className="map_loader_container">
              <span className="map_loader"></span>
            </div>

          </div>

        )}








      </div>

    </div>
  )
}

export default Dashboard