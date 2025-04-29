import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const RegionMap = () => {
  return (
    <div className="w-full h-screen">
      abc
      {/* <div className="w-[50%] border border-red-500">
        <ComposableMap projection="geoMercator">
          <Geographies geography="/india-osm.geojson">
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div className="w-[50%] border border-blue-500"></div> */}
    </div>
  );
};

export default RegionMap;

const stateToRegion = {
  "Jammu and Kashmir": "North",
  Punjab: "North",
  Haryana: "North",
  Delhi: "North",
  Uttarakhand: "North",
  "Himachal Pradesh": "North",
  "Uttar Pradesh": "North",

  Rajasthan: "West",
  Gujarat: "West",
  Maharashtra: "West",
  Goa: "West",

  Bihar: "East",
  Jharkhand: "East",
  Odisha: "East",
  "West Bengal": "East",

  "Madhya Pradesh": "Central",
  Chhattisgarh: "Central",

  "Tamil Nadu": "South",
  Kerala: "South",
  Karnataka: "South",
  "Andhra Pradesh": "South",
  Telangana: "South",

  Assam: "Northeast",
  Manipur: "Northeast",
  Meghalaya: "Northeast",
  Mizoram: "Northeast",
  Nagaland: "Northeast",
  Tripura: "Northeast",
  "Arunachal Pradesh": "Northeast",
  Sikkim: "Northeast",
};

// Colors for each region
const regionColors = {
  North: "#FF5722",
  South: "#4CAF50",
  East: "#2196F3",
  West: "#FFC107",
  Central: "#9C27B0",
  Northeast: "#00BCD4",
};
