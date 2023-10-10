import axios from "axios";

const signInApi = async (user) => {
  const response = await axios.post(
    "http://localhost:3000/admin/login",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        ...user,
      },
    }
  );
  return response;
};
export default signInApi;
