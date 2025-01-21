import { LoginSuccess } from "./action";
import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR, Login_Success, Logout_Success } from "./actionType";

const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  isAuth:false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    }
    case DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case Login_Success:{
      return {
        ...state,
        isLoading:false,
        isError:false,
        isAuth:true
      }
    }
    case Logout_Success:{
      return {
        ...state,
        isAuth:false
      }
    }
    default: {
      return state;
    }
  }
};
