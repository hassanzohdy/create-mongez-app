import Endpoint, { setCurrentEndpoint } from "@mongez/http";
import user from "user";

const endpoint = new Endpoint({
  // will convert any PUT request to a POST request with a body of the form: and append _method=PUT to the body
  // whether the request body is object, FormElement or FormData
  putToPost: true,
  baseURL: process.env.REACT_APP_API_URL,
  setAuthorizationHeader: () => {
    if (user.isLoggedIn()) {
      return `Bearer ${user.getAccessToken()}`;
    }

    return `key ${process.env.REACT_APP_API_KEY}`;
  },
});

export default endpoint;

// this will allow us to use the endpoint instance anywhere in the application by importing getCurrentEndpoint
setCurrentEndpoint(endpoint);

