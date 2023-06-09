import React, { useEffect, useRef, useState } from "react";
import SpotsLocator from "./SpotsLocator";
import { fetchData } from "../../utils/fetch";
import { MapFilter } from "./MapFilter";

export function Spots() {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState<number>(2000);
  const [selectedToggle, setSelectedToggle] = useState<boolean>(true);
  const [selectedLatitude, setSelectedLatitude] = useState<number>(51.4912174);
  const [selectedLongitude, setSelectedLongitude] = useState<number>(-0.139305);

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDistance(Number(event.target.value));
  };

  const handleToggleChange = () => {
    setSelectedToggle(!selectedToggle);
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLatitude(Number(event.target.value));
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedLongitude(Number(event.target.value));
  };

  const fetchSpots = async () => {
    try {
      const data = await fetchData(
        `http://localhost:8150/spots?latitude=${selectedLatitude}&longitude=${selectedLongitude}&radius=${selectedDistance}&isCircle=${selectedToggle}`
      );

      let filterdData = data.map((spot: any) => {
        return { lat: parseFloat(spot.Lng), lng: parseFloat(spot.Lat) };
      });
      setCoordinates(filterdData);
    } catch (err) {
      console.error(err);
      console.error("Failed to fetch spots");
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ height: "99vh" }}>
        <div className="row h-100">
          <div className="col-lg-5" style={{ height: "99%" }}>
            <MapFilter
              distance={selectedDistance}
              toggle={selectedToggle}
              latitude={selectedLatitude}
              longitude={selectedLongitude}
              handleLatitudeChange={handleLatitudeChange}
              handleToggleChange={handleToggleChange}
              handleDistanceChange={handleDistanceChange}
              handleLongitudeChange={handleLongitudeChange}
              fetchSpots={fetchSpots}
            />
          </div>
          <SpotsLocator coordinates={coordinates} />;
        </div>
      </div>
    </>
  );
}
