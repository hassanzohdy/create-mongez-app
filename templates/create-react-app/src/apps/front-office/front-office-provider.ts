import { AxiosResponse } from "axios";
import endpoint from "shared/endpoint";
import user from "user";
//

endpoint.events.onSuccess((response: AxiosResponse) => {
  if (response.data.data) {
    response.data = response.data.data;
  }

  if (response.data.user) {
    user.login(response.data.user);
  }
});
