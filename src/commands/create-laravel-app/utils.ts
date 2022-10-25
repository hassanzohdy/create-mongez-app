export function hasMobileApp(project: string) {
  return ["both", "mobile"].includes(project);
}

export function prepareMobileApps(mobileAppType: string) {
  return mobileAppType === "both" ? ["android", "ios"] : [mobileAppType];
}

export function hasWebsiteApp(project: string) {
  return ["both", "website"].includes(project);
}

export function prepareWebApps(webAppType: string) {
  return webAppType === "both" ? ["admin", "website"] : [webAppType];
}
