import { Grid } from "@mui/material";
import Course from "./Course";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms";

const CourseList = () => {
  const list = useRecoilValue(listState);
  return (
    <Grid container spacing={2}>
      {list &&
        list.length > 0 &&
        list.map((item, id) => {
          return (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <Course {...item} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CourseList;
