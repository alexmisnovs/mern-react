import React, { useState, useContext } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/LoadingError/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingError/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = props => {
  const authStateContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    let responseData;
    if (!isLoginMode) {
      try {
        setIsLoading(true);
        // setError(null);
        const response = await fetch("http://localhost:5000/api/v1/users/signup", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        authStateContext.login();
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setError(e.message || "Something went wrong signing up");
      }
    }
  };
  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
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
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
    // alert("wanksa");
    console.log(formState.isValid);
  };

  const errorHandler = function () {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Signup"} required</h2>
        <hr />
        <form className="place-form" onSubmit={authSubmit}>
          {!isLoginMode && (
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
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="email"
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
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="password has to be at least 5 chars long"
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
