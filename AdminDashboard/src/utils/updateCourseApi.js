import axios from "axios";

const updateCourseApi = async (course) => {
  try {
    const response = axios.put(
      `http://localhost:3000/admin/courses/${course._id}`,
      JSON.stringify(course),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("jsonToken")}`,
        },
      }
    );
    return (await response).data;
  } catch (Error) {
    throw new Error(`can not update because of err : ${Error}`);
  }
};
export default updateCourseApi;
