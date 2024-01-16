import React, { useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import * as L from 'leaflet';

const FiltererdJsonData = ({
    selectedState,
    selectedDistrict,
    selectedTehsil,
    DistrictStyle,
    filteredIndiaDistrict,
    DistrictOnEachfeature,
}) => {
    const map = useMap();

    useEffect(() => {
        if (filteredIndiaDistrict.features.length > 0) {
            const bounds = filteredIndiaDistrict.features.reduce((acc, feature) => {
                const featureBounds = L.geoJSON(feature.geometry).getBounds();
                return acc.extend(featureBounds);
            }, new L.LatLngBounds());

            map.flyToBounds(bounds);
        }
    }, [filteredIndiaDistrict, map]);


    return (
        <GeoJSON
            key={`${selectedState}-${selectedDistrict}-${selectedTehsil}`}
            style={DistrictStyle}
            data={filteredIndiaDistrict.features}
            onEachFeature={DistrictOnEachfeature}
        />
    );
};

export default FiltererdJsonData;
