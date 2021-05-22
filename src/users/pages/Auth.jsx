import React, { useState, useContext } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpFetchClient } from "../../shared/hooks/http-fetch-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import AuthContext from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = props => {
  const authStateContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpFetchClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authSubmit = async e => {
    e.preventDefault();
    // temporary lets set appWideIslogged in to true
    // return;
    let responseData;
    if (isLoginMode) {
      try {
        // setError(null);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-type": "application/json",
          }
        );
        authStateContext.login(responseData.userId, responseData.token);
      } catch (e) {
        console.log(e);
      }
    }

    if (!isLoginMode) {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        console.log(responseData);
        authStateContext.login(responseData.userId, responseData.token);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.email.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
    // alert("wanksa");
    console.log(formState.isValid);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Signup"} required</h2>
        <hr />
        <form className="place-form" onSubmit={authSubmit}>
          {!isLoginMode && (
            <>
              <Input
                id="name"
                element="input"
                type="name"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorMessage="please enter a valid name"
                onInput={inputHandler}
                initialValue={formState.inputs.name.value}
                initialValidity={formState.inputs.name.isValid}
              />
              <ImageUpload id="image" center onInput={inputHandler} />
            </>
          )}

          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="please enter a valid email"
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValidity={formState.inputs.email.isValid}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage="password has to be at least 6 chars long"
            onInput={inputHandler}
            initialValue={formState.inputs.password.value}
            initialValidity={formState.inputs.password.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Signup"}
          </Button>
        </form>
        <Button onClick={switchHandler} inverse>
          Switch to {isLoginMode ? "Signup" : "Login"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
