import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
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
      let userId = 1;
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
      );
      setLoadedPlaces(responseData.places);

      //redirect to a different page
    } catch (e) {
      console.log(`Couldn't send request ${e}`);
    }
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
    </>
  );
};

export default NewPlace;
