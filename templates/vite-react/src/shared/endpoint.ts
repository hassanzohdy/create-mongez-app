import Endpoint, { setCurrentEndpoint } from "@mongez/http";
import { navigateTo } from "@mongez/react-router";
import user from "apps/front-office/account/user";
import URLS from "apps/front-office/utils/urls";
import { AxiosResponse } from "axios";
import { apiBaseUrl, apiKey, apiOS } from "./flags";

const endpoint = new Endpoint({
  putToPost: true,
  baseURL: apiBaseUrl + "/admin",
  setAuthorizationHeader: () => {
    if (user.isLoggedIn()) {
      return `Bearer ${user.getAccessToken()}`;
    }

    return `key ${apiKey}`;
  },
});

const endpointEvents = endpoint.events;

endpointEvents.beforeSending(config => {
  const headers: any = config.headers;
  headers["os"] = apiOS;
});

endpointEvents.onSuccess((response: AxiosResponse) => {
  if (response.data.data) {
    response.data = response.data.data;
  }

  if (response.data.user) {
    user.login(response.data.user);
  }
});

endpointEvents.onError(response => {
  if (response.status === 401) {
    user.logout();
    navigateTo(URLS.login);
  }
});

setCurrentEndpoint(endpoint);

export default endpoint;
