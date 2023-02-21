import endpoint from "shared/endpoint";

export function sendContactMessage(data: any) {
  return endpoint.post("/contact-us", data);
}
