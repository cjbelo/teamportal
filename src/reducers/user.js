import * as Session from "../utils/session";
import { GET_USER, USER_LOGIN, USER_LOGOUT } from "./userAction";

let sessionId = Session.get("session");

const initState = {
  loggedIn: false,
  sessionId: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      if (payload && payload.id) {
        return {
          loggedIn: true,
          sessionId,
          data: payload,
        };
      }
      return state;

    case USER_LOGIN:
      return {
        loggedIn: true,
        sessionId: payload.sessionId,
        data: payload.data,
      };

    case USER_LOGOUT:
      Session.del("session");
      return {
        loggedIn: false,
        sessionId: null,
      };

    default:
      return state;
  }
};
