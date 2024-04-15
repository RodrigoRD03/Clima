import axios from "axios";

const baseURL = "https://rodrigorodriguezdíaz.bsite.net/";

const getWeather = (country) => {
  country === "" ? (country = "mexíco") : (country = country);
  const request = axios.get(`${baseURL}/Clima/Clima?ubicacion="${country}"`);
  return request.then((response) => response.data);
};

export default {
  getWeather,
};
