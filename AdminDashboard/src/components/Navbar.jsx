import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedState } from "../atoms";

const Navbar = () => {
  const [logIn, setLogIn] = useRecoilState(loggedState);
  return (
    <AppBar position="static" style={{ color: "#007bff" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          makCourse
        </Typography>
        {!logIn ? (
          <>
            <Link to={"/login"}>
              <Button variant="contained">Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button variant="contained" style={{ marginLeft: 10 }}>
                SignUp
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/coursepage"}>
              <Button variant="contained">Courses</Button>
            </Link>
            <Link to={"/"}>
              <Button
                variant="contained"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setLogIn((val) => !val);
                }}
              >
                Logout
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
