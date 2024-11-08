import axios from "axios";

const baseApiResponse = (message, payload) => {
    return { message, payload };
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:5000"
    : "http://localhost:5000";

export const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`, // Use the environment-specific base URL
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return baseApiResponse(response.data.message, response.data.payload);
    } catch (error) {
      return baseApiResponse(
        error.response ? error.response.data.message : "An error accured",
        error.response ? error.response.data : null
      );
    }
};

export const register = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`, // Use the environment-specific base URL
        { username, password, email },
        { headers: { "Content-Type": "application/json" } }
      );
      return baseApiResponse(response.data.message, response.data.payload);
    } catch (error) {
      return baseApiResponse(
        error.response ? error.response.data.message : "An error accured",
        error.response ? error.response.data : null
      );
    }
};

export const updateProfile = async (user_id, full_name, username, email, phone_number) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user/updateProfile/${user_id}`, // Use the environment-specific base URL
        { full_name, username, email, phone_number },
        { headers: { "Content-Type": "application/json" } }
      );
      return baseApiResponse(response.data.message, response.data.payload);
    } catch (error) {
      return baseApiResponse(
        error.response ? error.response.data.message : "An error accured",
        error.response ? error.response.data : null
      );
    }
};