import { localStorageProvider } from '@/utils/method';
import * as actionType from '../constants/actionTypes';
import Cookies from 'js-cookie';

const PROFILE_KEY = 'profile';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorageProvider.save(PROFILE_KEY, { ...action?.data });

      Cookies.set('token', action?.data?.token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorageProvider.removeStorage(PROFILE_KEY);
      Cookies.remove('token');

      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
