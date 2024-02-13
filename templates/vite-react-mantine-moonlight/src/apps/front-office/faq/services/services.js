import endpoint from "shared/endpoint";
export function getFAQ() {
    return endpoint.get("/faq");
}
