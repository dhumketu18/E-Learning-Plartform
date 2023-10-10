import axios from "axios";

const signUpApi = async (user) => {
  const response = await axios.post(
    "http://localhost:3000/admin/signup",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export default signUpApi;
