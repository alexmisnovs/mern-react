import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHistory } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import AuthContext from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = props => {
  const authStateContext = useContext(AuthContext);
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
  const history = useHistory();

  const searchSubmitHandler = async event => {
    event.preventDefault();

    //TODO finish search
    try {
      let userId = 1;
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
      );
      setLoadedPlaces(responseData.places);
      history.push("/");
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
          Show me where I can go..
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
