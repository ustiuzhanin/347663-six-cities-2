import axios from "axios";
import { ActionCreator } from "./reducer/errors/errors";

export default function createAPI(dispatch) {
  const api = axios.create({
    // baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    baseURL: `http://localhost:8080/`,
    timeout: 100,
  });

  const onSucces = (response) => response;

  const onFail = (err) => {
    dispatch(ActionCreator.showErrorMessage({ err }));
    return err;
  };

  api.interceptors.response.use(onSucces, onFail);

  return api;
}
