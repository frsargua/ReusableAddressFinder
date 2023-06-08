import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import AddressInput from "./AddressInput";
import AddressDropdown from "./AddressDropdown";
import SelectedAddress from "./SelectedAddressForm";
import Map from "./MapComponent";

export const AddressFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.GeocoderResult | null>(null);
  const [geocodingResults, setGeocodingResults] = useState<
    google.maps.GeocoderResult[]
  >([]);
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };
  const apiKey = "AIzaSyCKnjgAMFR4PdmfEmJBmiZhCowIEfGC4wc";

  const handlePredictionClick = (prediction: string, index: number) => {
    setSearchTerm(prediction);
    setPredictions([]);
    setLoading(true);
    setSelectedPlace(geocodingResults[index]);

    const place = geocodingResults[index];
    const addressComponents = place.address_components;

    const line1 = addressComponents?.find((component) =>
      component.types.includes("street_number")
    )?.long_name;
    const city = addressComponents?.find((component) =>
      component.types.includes("locality")
    )?.long_name;
    const country = addressComponents?.find((component) =>
      component.types.includes("country")
    )?.long_name;
    const postcode = addressComponents?.find((component) =>
      component.types.includes("postal_code")
    )?.long_name;

    setAddressLine1(line1 || "");
    setCity(city || "");
    setCountry(country || "");
    setPostcode(postcode || "");

    const location = place.geometry?.location;
    if (location) {
      setLatitude(location.lat().toFixed(6));
      setLongitude(location.lng().toFixed(6));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { address: searchTerm, region: "uk" },
        (results, status) => {
          if (status === "OK" && results) {
            const newPredictions = results.map(
              (result) => result.formatted_address
            );
            setPredictions(newPredictions);
            setGeocodingResults(results);
          } else {
            setPredictions([]);
            setGeocodingResults([]);
          }
        }
      );
    } else {
      setPredictions([]);
      setGeocodingResults([]);
    }
  }, [searchTerm]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Address Finder</h5>
                <AddressInput
                  searchTerm={searchTerm}
                  onInputChange={handleInputChange}
                />
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                )}
                {predictions.length > 0 && (
                  <AddressDropdown
                    predictions={predictions}
                    onPredictionClick={handlePredictionClick}
                  />
                )}
                {selectedPlace && (
                  <SelectedAddress
                    addressLine1={addressLine1}
                    city={city}
                    country={country}
                    latitude={latitude}
                    longitude={longitude}
                    postcode={postcode}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <Map selectedPlace={selectedPlace} />
          </div>
        </div>
      </div>
    </LoadScript>
  );
};
