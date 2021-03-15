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

import AuthContext from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = props => {
  const appStateContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

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
  const authSubmit = e => {
    e.preventDefault();
    // temporary lets set appWideIslogged in to true
    appStateContext.login();
    console.log(appStateContext.isLoggedIn);
    console.log("pressed login button");
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
  };
  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login" : "Signup"} required</h2>
      <hr />
      <form className="place-form" onSubmit={authSubmit}>
        {!isLoginMode && (
          <Input
            id="username"
            element="input"
            type="username"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage="please enter a valid username"
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
  );
};

export default Auth;
