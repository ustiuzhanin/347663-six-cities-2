import axios from "axios";
import { ActionCreator } from "./reducer/errors/errors";

export const testApi = axios.create({
  baseURL: `http://localhost:8080/`,
  timeout: 1000 * 10,
});

export default function createAPI(dispatch) {
  const api = axios.create({
    // baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    // baseURL: `http://localhost:8080/`,
    baseURL: `https://rest-six-cities.herokuapp.com/`,
    timeout: 1000 * 10,
  });

  const onSucces = (response) => response;

  const onFail = (err) => {
    dispatch(ActionCreator.showErrorMessage({ err }));
  };

  api.interceptors.response.use(onSucces, onFail);

  return api;
}
