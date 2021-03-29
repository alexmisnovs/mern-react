import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHistory } from "react-router-dom";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = props => {
  const authStateContext = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    // send this to the backend.
    //console.log(formState.inputs);
    console.log(authStateContext.userId);
    try {
      await sendRequest(
        "http://localhost:5000/api/v1/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: authStateContext.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
      //redirect to a different page
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          rows="5"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorMessage="please enter a valid description"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="please enter a valid Address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
