import { USER_LOGOUT } from "../reducers/userAction";
import { CLEAR_POST } from "../reducers/postAction";
import { Get } from "../api";

function isValidEmail(email) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
}

function logout(dispatch) {
  Get("/user/logout", true).then((res) => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CLEAR_POST });
  });
}

function scrollToTop(transition = true) {
  const anchor = document.querySelector("#back-to-top-anchor");
  if (anchor) {
    const effect = { block: "center" };
    if (transition) {
      effect.behavior = "smooth";
    }
    anchor.scrollIntoView(effect);
  }
}

export { isValidEmail, logout, scrollToTop };
