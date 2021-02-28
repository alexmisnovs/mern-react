import React from "react";
import PlaceList from "../components/PlaceList";

function UserPlaces(props) {
  const dummyPlaces = [
    {
      id: "p1",
      title: "Empire State building",
      description: "One of the most famous buildings",
      imageUrl: "https://picsum.photos/200/300",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: 73.9856644
      },
      creator: "u1"
    },
    {
      id: "p2",
      title: "Empire State building",
      description: "One of the most famous buildings",
      imageUrl: "https://picsum.photos/200/300",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: 73.9856644
      },
      creator: "u2"
    }
  ];
  return <PlaceList items={dummyPlaces} />;
}

export default UserPlaces;
