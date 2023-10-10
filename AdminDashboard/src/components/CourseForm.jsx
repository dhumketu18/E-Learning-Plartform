import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "title": {
      return { ...state, title: action.title };
    }
    case "description": {
      return { ...state, description: action.description };
    }
    case "price": {
      return { ...state, price: action.price };
    }
    case "imageLink": {
      return { ...state, imageLink: action.imageLink };
    }
  }
  throw Error("unknown action type" + action.type);
};
const CourseForm = ({ course, type, onClick }) => {
  console.log("course", course);
  const [state, dispatch] = useReducer(
    reducer,
    course
      ? { ...course }
      : { title: "", description: "", price: "", imageLink: "" }
  );

  const changeHandler = (e) => {
    return dispatch({ type: e.target.name, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onClick({ ...state });
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          onSubmit={submitHandler}
        >
          <FormControl>
            <TextField
              label="Title"
              name="title"
              value={state.title}
              onChange={changeHandler}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Description"
              name="description"
              value={state.description}
              onChange={changeHandler}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={state.price}
              onChange={changeHandler}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Image Link"
              name="imageLink"
              value={state.imageLink}
              onChange={changeHandler}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            {type}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
