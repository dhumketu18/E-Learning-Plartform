import axios from "axios";

const addCourseApi = async (courseObj) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/admin/courses",
      JSON.stringify(courseObj),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("jsonToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(`item can not be added because ${err}`);
  }
};
export default addCourseApi;
