import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";

const Users = props => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users");
        const responseData = await response.json();
        console.log(responseData.users);
        if (!response.ok) {
          setError(responseData.message);
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (e) {
        console.log(e);
        setError(e.message || "Something went wrong signing up");
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorHandler = function () {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />{" "}
        </div>
      )}
      <h1>{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}</h1>
    </>
  );
};

export default Users;
