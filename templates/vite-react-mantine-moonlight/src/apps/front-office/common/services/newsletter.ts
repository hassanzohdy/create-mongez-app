import endpoint from "shared/endpoint";

export function subscribeToNewsletter(data: any) {
  return endpoint.post("/newsletter/subscribe", data);
}
