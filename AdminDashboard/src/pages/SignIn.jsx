import { Card, Typography, TextField, Button } from "@mui/material";
import { useReducer, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loggedState } from "../atoms";
import { useNavigate } from "react-router-dom";
import signInApi from "../utils/signInApi";

const reducer = (state, action) => {
  if (action.type === "username") {
    return { ...state, username: action.username };
  } else if (action.type === "password") {
    return { ...state, password: action.password };
  } else {
    throw Error("unknown action: " + action.type);
  }
};
const SignIn = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const setLoggedIn = useSetRecoilState(loggedState);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await signInApi(state);
      localStorage.setItem("jsonToken", response.data.token);
      setLoggedIn(true);
      navigate("/");
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const changeHandler = (e) => {
    dispatch({ type: e.target.name, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      <Card
        style={{
          minHeight: 350,
          minWidth: 300,
        }}
      >
        <Typography align="center" variant="h5" marginTop={5}>
          Log In
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth={true}
              type="email"
              label="username"
              variant="outlined"
              name="username"
              value={state.username}
              onChange={changeHandler}
            />
            <br></br>
            <br></br>
            <TextField
              fullWidth={true}
              label="password"
              type="password"
              name="password"
              variant="outlined"
              value={state.password}
              onChange={changeHandler}
            />
            <br></br>
            <br></br>
            <Button variant="contained" type={"submit"}>
              Log In
            </Button>
          </form>
        </div>
        {error && <p>{error.message}</p>}
      </Card>
    </div>
  );
};
export default SignIn;
