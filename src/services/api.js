import axios from "axios";

//base da url:https://api.themoviedb.org/3
//url da api : /movie/550?api_key=7aec8ffe180d33bbc8c3f1e87a9709a8

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
