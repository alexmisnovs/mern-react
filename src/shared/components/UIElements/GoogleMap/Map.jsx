import React, { useEffect, useRef } from "react";
import "./Map.css";
import { useRef } from "react";

const Map = props => {
  // ref helps us to have variables what can survive re render
  // TODO: Signup for the api key and test out the google maps.
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, []);

  return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
