import endpoint from "shared/endpoint";
export function sendContactMessage(data) {
    return endpoint.post("/contact-us", data);
}
