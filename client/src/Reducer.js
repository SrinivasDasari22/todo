function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        userName: action.userName,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        title: action.title,
        description: action.description,
        dateCreated: action.dateCreated,
        author: action.author,
        completed: action.completed,
        dateCompleted: action.dateCompleted,
        _id: action._id,
      };
      return [newPost, ...state];

    case "TOGGLE_POST":
      const index = state.findIndex((object) => object._id === action._id);
      let toggleValue = state[index].completed;
      toggleValue = !toggleValue;
      const updatedObject = {
        ...state[index],
        completed: toggleValue,
        dateCompleted: action.dateCompleted,
      };
      const newState = [...state];
      newState[index] = updatedObject;
      return newState;

    case "DELETE_POST":
      const index1 = state.findIndex((object) => object._id === action._id);
      const newState1 = [...state.slice(0, index1), ...state.slice(index1 + 1)];

      return newState1;

    case "FETCH_POSTS":
      return action.posts;

    case "CLEAR_POSTS":
      return [];

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
