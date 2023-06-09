import React, { useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_API_KEY;

const SpotsLocator = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const { coordinates } = props;

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && coordinates.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      coordinates.forEach((coordinate) => {
        bounds.extend(coordinate);
      });

      map.fitBounds(bounds);
    }
  }, [map, coordinates]);

  return isLoaded ? (
    <div className="col-lg-7">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {coordinates.map((coordinate, index) => {
          return <MarkerF key={index} position={coordinate} />;
        })}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div>
  );
};

export default React.memo(SpotsLocator);
