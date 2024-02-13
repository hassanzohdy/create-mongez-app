import endpoint from "shared/endpoint";
export function subscribeToNewsletter(data) {
    return endpoint.post("/newsletter/subscribe", data);
}
