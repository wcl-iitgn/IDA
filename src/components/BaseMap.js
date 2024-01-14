import React, { useEffect, useState } from 'react'
import { TileLayer, GeoJSON, LayersControl, FeatureGroup, ScaleControl, useMap, useMapEvents } from 'react-leaflet'
import { indiastates } from '../assets/data/indiaStates';
// import { indiaDistrict } from '../assets/data/indiaDistrict';


// import L from 'leaflet';
import { FaHome } from "react-icons/fa";



const layers = [
  {
    name: "Google Map",
    url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: "Open Street Map",
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c']
  },
  {
    name: "Topographic Map",
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c']
  },
  {
    name: "Satellite Map",
    url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }

]



const BaseMap = () => {
  const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 });

  const map = useMap();

  const HandleMouseHover = () => {


    useMapEvents({
      mousemove: (e) => {
        setMousePosition(e.latlng);
      },
    });
    return null;
  };




  const handleZoomToCenter = () => {
    map.setView([23, 79], 5);

  };




  return (
    <>
      <LayersControl position="topright" collapsed={true}>
        {layers.map((layer, index) => {
          return (
            <LayersControl.BaseLayer
              key={index}
              checked={index === 0 ? true : false}
              name={layer.name}
            >
              <TileLayer
                attribution={layer.attribution}
                url={layer.url}
                subdomains={layer.subdomains}
              />
            </LayersControl.BaseLayer>
          )
        })}




        

        <LayersControl.Overlay checked name="States Boundary">
          <FeatureGroup>
            
            <GeoJSON data={indiastates.features} style={{
              fillColor: 'none',
              weight: 2,
              color: 'black',
              interactive: false
            }} />
          </FeatureGroup>
        </LayersControl.Overlay>


      </LayersControl>

      <HandleMouseHover />

      <div
        className='coordinates_container' >
        Lat: {mousePosition.lat.toFixed(4)}, Long:{" "}
        {mousePosition.lng.toFixed(4)}
      </div>
      <button className='zoom_btn' onClick={handleZoomToCenter}><FaHome /></button>
      <ScaleControl />




    </>
  )
}

export default BaseMap