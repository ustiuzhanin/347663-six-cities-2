import { combineReducers } from "redux";

import { reducer as cityList } from "./city-list/city-list";
import { reducer as offers } from "./offers/offers";
import { reducer as auth } from "./auth/auth";
import { reducer as comments } from "./comments/comments";
import { reducer as activeCard } from "./active-card/active-card";
import { reducer as errors } from "./errors/errors";
import { reducer as user } from "./user/user";

export default combineReducers({
  cityList,
  offers,
  auth,
  comments,
  activeCard,
  errors,
  user,
});
