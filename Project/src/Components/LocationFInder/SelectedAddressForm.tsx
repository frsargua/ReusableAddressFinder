import React, { useEffect, useState } from "react";

type SelectedAddressProps = {
  addressLine1: any;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  postcode: string;
};

const SelectedAddress: React.FC<SelectedAddressProps> = (props) => {
  const { addressLine1, city, country, latitude, longitude, postcode } = props;
  return (
    <div className="mt-4">
      <h6>Selected Address:</h6>
      <div className="mb-2">
        <label htmlFor="addressLine1" className="form-label">
          Address Line 1
        </label>
        <input
          type="text"
          id="addressLine1"
          className="form-control"
          value={addressLine1 || ""}
          readOnly
        />
      </div>
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            className="form-control"
            value={city || ""}
            readOnly
          />
        </div>
        <div className="col-md">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="form-control"
            value={country || ""}
            readOnly
          />
        </div>
      </div>
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="latitude" className="form-label">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            className="form-control"
            value={latitude || ""}
            readOnly
          />
        </div>
        <div className="col-md">
          <label htmlFor="longitude" className="form-label">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            className="form-control"
            value={longitude || ""}
            readOnly
          />
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="postcode" className="form-label">
          Postcode
        </label>
        <input
          type="text"
          id="postcode"
          className="form-control"
          value={postcode || ""}
          readOnly
        />
      </div>
    </div>
  );
};

export default SelectedAddress;
