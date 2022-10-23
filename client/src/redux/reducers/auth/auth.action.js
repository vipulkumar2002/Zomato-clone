import axios from "axios";

// redux types
import { SIGN_IN, SIGN_UP, LOG_OUT, GOOGLE_AUTH } from "./auth.type";

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "post",
      url: "http://localhost:4000/auth/signin",
      data: { credentials: userData },
    });

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
