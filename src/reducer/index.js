import { combineReducers } from "redux";

import { reducer as cityList } from "./city-list/city-list";
import { reducer as offers } from "./offers/offers";
import { reducer as auth } from "./auth/auth";
import { reducer as comments } from "./comments/comments";
import { reducer as activeCard } from "./active-card/active-card";
import { reducer as offersInRadius } from "./offers-in-radius/offers-in-radius";
import { reducer as errors } from "./errors/errors";

export default combineReducers({
  cityList,
  offers,
  auth,
  comments,
  activeCard,
  offersInRadius,
  errors,
});
