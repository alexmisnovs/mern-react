import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import PlaceList from "../components/PlaceList";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import "./PlaceForm.css";

const NewPlace = props => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();
  const [formState, inputHandler] = useForm(
    {
      city: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const searchSubmitHandler = async event => {
    event.preventDefault();

    //TODO finish search
    try {
      const city = formState.inputs.city.value;
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/search/${city}`
      );
      // console.log(responseData);
      setLoadedPlaces(responseData.places);

      //redirect to a different page
    } catch (e) {
      console.log(`Couldn't send request ${e}`);
    }
  };

  const deletedPlaceHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={searchSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="App">
          <h1>Find a playgound near you</h1>
        </div>
        <Input
          id="city"
          element="input"
          type="text"
          label="City or Town"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="please enter a city or town"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Search..
        </Button>
      </form>

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={deletedPlaceHandler} />
      )}
    </>
  );
};

export default NewPlace;
