import React, { useEffect, useRef, useState } from 'react'
import Plot from 'react-plotly.js';

import { Box } from "@mui/system";
import { Autocomplete, TextField } from "@mui/material";
import PlaceAttributes from "../assets/data/PlaceAttributes.json";
import ExportTimeSeries from './ExportTimeSeries';


const TimeseriesPage = () => {
    const mapContainerRef = useRef(null);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    const [loading, setLoading] = useState(false);

    const [districtList, setDistrictList] = useState([]);
    const [tehsilList, setTehsilList] = useState([]);
    const [tehsilSelectedItem, setTehsilSelectedItem] = useState([]);

    const [selectedData, setSelectedData] = useState(null);

    const [droughtArea, setDroughtArea] = useState(null);
    const [droughtIntensity, setDroughtIntensity] = useState(null);



    const plotData = selectedData && selectedData.length > 0
        ? Object.entries(selectedData[0])
            .filter(([key, value]) => key !== "ID" && parseInt(key) >= startYear && parseInt(key) <= endYear)
            .map(([year, droughtValue]) => ({
                Year: parseInt(year),
                DroughtValue: parseFloat(droughtValue),
            }))
        : [];




    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const droughtAreaResponse = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/Area.json`);
                const droughtArea = await droughtAreaResponse.json();

                const droughtIntensityResponse = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/Intensity.json`);
                const droughtIntensity = await droughtIntensityResponse.json();

                setDroughtArea(droughtArea);
                setDroughtIntensity(droughtIntensity);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching and filtering wind data:", error);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if (selectedSession && startYear && endYear && tehsilSelectedItem) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    // Fetching data from the API
                    const response = await fetch(`https://aman1chaudhary.github.io/india-drought-atlas-data/${selectedSession}.json`);
                    const droughtData = await response.json();

                    const filteredDroughtData = droughtData.filter(data => data.ID === tehsilSelectedItem[0].ID.toString());
                    setSelectedData(filteredDroughtData);
                    setLoading(false);

                } catch (error) {
                    console.error("Error fetching and filtering wind data:", error);
                }
            };
            fetchData();
        }
    }, [selectedSession, startYear, endYear, tehsilSelectedItem]);



    const handleStateSelect = (event, value) => {
        let items = PlaceAttributes.filter((item) => item.STATE === value);
        items = [...new Set(items.map((item) => item))];
        items.sort();

        setDistrictList(items);
    };


    const handleDistrictSelect = (event, value) => {
        let items = districtList.filter((item) => item.DISTRICT === value);
        items = [...new Set(items.map((item) => item))];
        items.sort();

        setTehsilList(items);
    };

    const handleTehsilSelect = (event, value) => {
        let item = tehsilList.filter((item) => item.TEHSIL === value);
        setTehsilSelectedItem(item);
    };

    const handleStartYearChange = (event, value) => {
        setStartYear(value);
    };


    const handleEndYearChange = (event, value) => {
        setEndYear(value);
    };


    const handleSessionChange = (event, value) => {
        setSelectedSession(value);
    };




    return (
        <div className='dasboard_page_container'>

            <div className='main_dashboard'>
                <div className='left_panel'>


                    <div className='border border-secondary p-2 mb-2'>
                        <Autocomplete
                            style={{ marginBottom: "10px" }}
                            onChange={(event, value) => handleStateSelect(event, value)}
                            id="state"
                            getOptionLabel={(state) => `${state}`}
                            options={[...new Set(PlaceAttributes.map((item) => item.STATE))]}
                            isOptionEqualToValue={(option, value) => option.Name === value.Name}
                            noOptionsText={"No Available Data"}
                            // size='small'
                            renderOption={(props, state) => (
                                <Box component="li" {...props} key={state}
                                    sx={{
                                        fontSize: "12px",
                                    }}>
                                    {state}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params}
                                label="Search State"
                            // InputProps={{
                            //     style: {
                            //       fontSize: "12px", 
                            //     },
                            //   }} 
                            />}
                        />

                        <Autocomplete
                            style={{ marginBottom: "10px" }}
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
                            style={{ marginBottom: "10px" }}
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






                    <div className='border border-secondary p-2 mb-2'>
                        <Autocomplete
                            style={{ marginBottom: "10px" }}
                            onChange={(event, value) => handleStartYearChange(event, value)}
                            id="startyear"
                            disabled={tehsilSelectedItem.length === 0}
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
                                    label="Select Start Year"
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={startYear}
                                />
                            )}
                        />

                        <Autocomplete
                            disabled={tehsilSelectedItem.length === 0}
                            style={{ marginBottom: "10px" }}
                            onChange={(event, value) => handleEndYearChange(event, value)}
                            id="endyear"
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
                                    label="Select End Year"
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={endYear}
                                />
                            )}
                        />
                    </div>

                    <div className='border border-secondary p-2 mb-2'>
                        <Autocomplete
                            // style={{ marginBottom: "5px", }}
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

                        <label className="form-label">Or</label><br />

                        <Autocomplete
                            // style={{ marginBottom: "5px", }}
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

                    {plotData && plotData.length > 0 && selectedSession && (
                        <ExportTimeSeries mapContainerRef={mapContainerRef} />
                    )}






                </div>


                <div className='right_panel' ref={mapContainerRef} >


                    {plotData && plotData.length > 0 && selectedSession && (
                        <Plot
                            data={[
                                {
                                    x: plotData.map(entry => entry.Year),
                                    y: plotData.map(entry => entry.DroughtValue),

                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'red' },
                                },
                            ]}
                            layout={{
                                title: `Season / Month: ${selectedSession}`,
                                xaxis: {
                                    title: 'Year',
                                },
                                yaxis: {
                                    title: 'SPEI (Standardized Precipitation Evapotranspiration Index)',
                                },
                            }}
                            style={{ width: "100%", height: "100%" }}
                        />

                    )}

                    {droughtArea && droughtIntensity && plotData.length === 0 && (
                        <>

                            <Plot
                                data={[
                                    {
                                        x: droughtArea.map(entry => entry.Year),
                                        y: droughtArea.map(entry => entry.Summer_Monsoon),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'red' },
                                        name: 'Summer Monsoon', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtArea.map(entry => entry.Year),
                                        y: droughtArea.map(entry => entry.Winter_Monsoon),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'blue' },
                                        name: 'Winter Monsoon', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtArea.map(entry => entry.Year),
                                        y: droughtArea.map(entry => entry.Calendar_Year),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'green' },
                                        name: 'Calendar Year', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtArea.map(entry => entry.Year),
                                        y: droughtArea.map(entry => entry.Water_Year),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'purple' },
                                        name: 'Water Year', // Assign a name to the trace
                                    },
                                ]}
                                layout={{
                                    title: 'Drought Area',
                                    xaxis: {
                                        title: 'Year',
                                    },
                                    yaxis: {
                                        title: 'Drought Area (Mkm2)',
                                    },
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />

                            <Plot
                                data={[
                                    {
                                        x: droughtIntensity.map(entry => entry.Year),
                                        y: droughtIntensity.map(entry => entry.Summer_Monsoon),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'red' },
                                        name: 'Summer Monsoon', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtIntensity.map(entry => entry.Year),
                                        y: droughtIntensity.map(entry => entry.Winter_Monsoon),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'blue' },
                                        name: 'Winter Monsoon', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtIntensity.map(entry => entry.Year),
                                        y: droughtIntensity.map(entry => entry.Calendar_Year),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'green' },
                                        name: 'Calendar Year', // Assign a name to the trace
                                    },
                                    {
                                        x: droughtIntensity.map(entry => entry.Year),
                                        y: droughtIntensity.map(entry => entry.Water_Year),
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'purple' },
                                        name: 'Water Year', // Assign a name to the trace
                                    },
                                ]}
                                layout={{
                                    title: "Mean Drought Intensity",
                                    xaxis: {
                                        title: 'Year',
                                    },
                                    yaxis: {
                                        title: 'Mean Drought Intensity',
                                    },
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </>

                    )}


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

export default TimeseriesPage