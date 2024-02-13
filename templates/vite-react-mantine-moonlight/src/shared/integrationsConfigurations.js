import { facebookAppId, facebookAppVersion, googleClientId, googleMapApiKey, } from "./flags";
export const integrationsConfigurations = {
    google: {
        maps: {
            apiKey: googleMapApiKey,
        },
        auth: {
            clientId: googleClientId,
        },
    },
    facebook: {
        appId: facebookAppId,
        version: facebookAppVersion,
    },
};
