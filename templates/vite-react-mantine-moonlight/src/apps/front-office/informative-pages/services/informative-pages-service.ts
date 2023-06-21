import endpoint from "shared/endpoint";

export function getPagesList() {
  return endpoint.get("/pages", {
    cache: true,
  });
}

export function getPage(name: string) {
  return endpoint.get(`/pages/${name}`, {
    cache: true,
  });
}
