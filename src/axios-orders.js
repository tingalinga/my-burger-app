import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-app-af62d.firebaseio.com/",
});

export default instance;
