import React, { useReducer } from "react";
import login from "../utils/login";

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "error":
      return {
        ...state,
        error: "Incorect username or password!",
        isLoading: false,
        username: "",
        password: "",
      };
    case "logout":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,       
        username: "",
        password: "",
      };
    case 'field':
        return {
            ...state,
            [action.field]: action.value
        }  
    default:
      break;
  }

  return state;
}

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

export default function LoginPlain() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  async function onSubmit(e) {
    e.preventDefault();

    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (e) {
      dispatch({ type: "error" });
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Hello {username}</h1>
          <button onClick={e => dispatch({ type: "logout" })}>Logout</button>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <p>Please Login!</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => {
              dispatch({
                type: "field",
                field: "username",
                value: e.currentTarget.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            onChange={e => {
                dispatch({
                type: "field",
                field: "password",
                value: e.currentTarget.value,
              });
            }}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      )}
    </>
  );
}
