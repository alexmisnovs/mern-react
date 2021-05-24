import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";

const Users = props => {
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users");

        setLoadedUsers(responseData.users);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
