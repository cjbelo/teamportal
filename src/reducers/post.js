import { INIT_POST, ADD_POST, CLEAR_POST } from "./postAction";

const initState = {
  loaded: false,
  posts: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case INIT_POST:
      return {
        loaded: true,
        posts: payload,
      };

    case ADD_POST:
      let posts = state.posts;
      if (Array.isArray(payload)) {
        posts = [...payload, ...posts];
      }
      return {
        ...state,
        posts: [payload, ...posts],
      };

    case CLEAR_POST:
      return initState;

    default:
      return state;
  }
};
