import axios from "axios";
const fetchCoursesApi = async () => {
  const token = localStorage.getItem("jsonToken");

  try {
    if (!token) {
      throw new Error("No authentication token available.");
    }
    const response = await axios.get("http://localhost:3000/admin/courses", {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
};
export default fetchCoursesApi;
