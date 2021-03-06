import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

function UserPlaces(props) {
  const { userId } = useParams();

  const dummyPlaces = [
    {
      id: "1",
      title: "Empire State building 2",
      description: "One of the most famous buildings",
      imageUrl: "https://picsum.photos/200/300",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: 73.9856644,
      },
      creator: "1",
    },
    {
      id: "2",
      title: "Empire State building 1",
      description: "One of the most famous buildings",
      imageUrl: "https://picsum.photos/200/300",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: 73.9856644,
      },
      creator: "1",
    },
    {
      id: "3",
      title: "Empire State building",
      description: "One of the most famous buildings",
      imageUrl: "https://picsum.photos/200/300",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: 73.9856644,
      },
      creator: "2",
    },
  ];

  const loadedPlaces = dummyPlaces.filter(place => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
