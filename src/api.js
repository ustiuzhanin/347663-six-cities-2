import axios from "axios";
// import { ActionCreator } from "./reducer/errors/errors";

export default function createAPI(dispatch) {
  const api = axios.create({
    // baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    baseURL: `http://localhost:8080/`,
    timeout: 1000 * 10,
  });

  const onSucces = (response) => response;

  const onFail = (err) => {
    // eslint-disable-next-line
    console.log(err);
    // dispatch(ActionCreator.showErrorMessage({ err: err.code }));
    return err;
  };

  api.interceptors.response.use(onSucces, onFail);

  return api;
}
