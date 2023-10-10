import { Card, Typography, TextField, Button } from "@mui/material";
import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedState } from "../atoms";
import signUpApi from "../utils/signUpApi";

const reducer = (state, action) => {
  if (action.type === "username") {
    return { ...state, username: action.username };
  } else if (action.type === "password") {
    return { ...state, password: action.password };
  } else {
    throw Error("unknown action: " + action.type);
  }
};
const SignUp = () => {
  const setLoggedIn = useSetRecoilState(loggedState);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await signUpApi(state);
      localStorage.setItem("jsonToken", response.data);
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
          Sign Up
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
              Sign Up
            </Button>
            <div style={{ marginTop: 10 }}>
              Already a user?&nbsp;<Link to="/login">Sign In</Link>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      </Card>
    </div>
  );
};
export default SignUp;
