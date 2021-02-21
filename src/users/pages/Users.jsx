import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/UsersList";

const Users = props => {
  const { id } = useParams();
  const users = [
    {
      id: 1,
      name: "Alex",
      image: "https://picsum.photos/100",
      places: 1,
    },
    {
      id: 2,
      name: "Dennis",
      image: "https://picsum.photos/100",
      places: 3,
    },
  ];
  return (
    <>
      <h1>
        <UsersList items={users} />
      </h1>
    </>
  );
};

export default Users;
