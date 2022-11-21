import endpoint from "shared/endpoint";

export function getGuestToken() {
  return endpoint.post("/login/guests");
}

export function login(data: any) {
  return endpoint.post("/login", data);
}
