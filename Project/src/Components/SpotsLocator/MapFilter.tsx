import React, { useState } from "react";

interface MapFilterProps {
  distance: number;
  toggle: boolean;
  latitude: number;
  longitude: number;
  handleDistanceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLatitudeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLongitudeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleChange: () => void;
  fetchSpots: () => void;
}

export const MapFilter: React.FC<MapFilterProps> = ({
  distance,
  toggle,
  latitude,
  longitude,
  handleDistanceChange,
  handleToggleChange,
  handleLatitudeChange,
  handleLongitudeChange,
  fetchSpots,
}) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Map Filter</h2>
      <div className="form-group">
        <label className="form-label">Distance: {distance} meter/s</label>
        <input
          type="range"
          className="form-range"
          min={200}
          max={40000}
          value={distance}
          onChange={handleDistanceChange}
        />
      </div>
      <div className="form-check form-switch mb-4">
        <input
          type="checkbox"
          className="form-check-input"
          id="toggle-switch"
          checked={toggle}
          onChange={handleToggleChange}
        />
        <label className="form-check-label" htmlFor="toggle-switch">
          <span className="toggle-label">{toggle ? "Circle" : "Square"}</span>
        </label>
      </div>
      <div className="form-group mb-4">
        <label className="form-label">Latitude</label>
        <input
          type="number"
          className="form-control"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <div className="form-group mb-4">
        <label className="form-label">Longitude</label>
        <input
          type="number"
          className="form-control"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <button onClick={fetchSpots} className="btn btn-primary w-100">
        Search
      </button>
    </div>
  );
};
