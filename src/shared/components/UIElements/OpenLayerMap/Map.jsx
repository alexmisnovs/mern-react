import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        new window.ol.layer.Vector({
          source: new window.ol.source.Vector({
            features: [
              new window.ol.Feature({
                geometry: new window.ol.geom.Point(
                  window.ol.proj.fromLonLat([center.lng, center.lat])
                ),
              }),
            ],
          }),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    console.log(`Map created ${center.lng}, ${center.lat}`);
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${props.className}`} style={props.style} id="map"></div>;
};

export default Map;
