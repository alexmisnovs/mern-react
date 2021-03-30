import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";

function UserPlaces(props) {
  const { userId } = useParams();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (e) {
        setLoadedPlaces([]);
        console.log(e);
      }
    };
    fetchUsers();
  }, [sendRequest, userId]);

  const deletedPlaceHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={deletedPlaceHandler} />
      )}
    </>
  );
}

export default UserPlaces;
