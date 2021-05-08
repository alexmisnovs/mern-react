import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import AuthContext from "../../shared/context/auth-context";

const UpdatePlace = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const authStateContext = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        console.log(responseData.place);
        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: loadedPlace.title,
              isValid: true,
            },
            description: {
              value: loadedPlace.description,
              isValid: true,
            },
          },
          true
        );
      } catch (e) {
        // setLoadedPlace([]);
        // console.log(e);
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }
  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Place is not found;</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    // send this to the backend.
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json", Authorization: "Bearer " + authStateContext.token }
      );
      history.push(`/${authStateContext.userId}/places`);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage="please enter a valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValidity={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            rows="5"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="please enter a valid description"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValidity={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
