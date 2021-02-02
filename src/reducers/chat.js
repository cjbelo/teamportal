const initState = {
  auth: {
    loggedIn: false,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case "CHAT_LOGIN":
      return { ...state, auth: { loggedIn: true, t: action.payload } };
    case "LOGOUT":
      return { ...state, auth: { loggedIn: false } };
    default:
      return state;
  }
};
