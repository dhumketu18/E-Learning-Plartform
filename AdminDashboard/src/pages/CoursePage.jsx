import { useEffect, useState } from "react";
import AddItem from "../components/AddItem";
import CourseList from "../components/CourseList";
import { Box, CircularProgress } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { listState } from "../atoms";
import fetchCoursesApi from "../utils/fetchCoursesApi";

const CoursePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const setList = useSetRecoilState(listState);
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetchCoursesApi();
        setList(response.courses);
        setError(null);
      } catch (Error) {
        setError(Error);
      }

      setIsLoading(false);
    };
    fetching();
    return () => {};
  });
  return (
    <div>
      <AddItem></AddItem>
      {isLoading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>{error ? <p>{error.message}</p> : <CourseList></CourseList>}</>
      )}
    </div>
  );
};
export default CoursePage;
