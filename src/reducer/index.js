import {combineReducers} from 'redux';

import {reducer as data} from './data/data';
import {reducer as cityList} from './city-list/city-list';
import {reducer as offers} from './offers/offers';
import {reducer as auth} from './auth/auth';

export default combineReducers({
  data,
  cityList,
  offers,
  auth
});
