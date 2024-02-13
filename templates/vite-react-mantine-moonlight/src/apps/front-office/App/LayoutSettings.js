import createCache from "@emotion/cache";
import { isLTR } from "apps/front-office/utils/helpers";
import rtlPlugin from "stylis-plugin-rtl";
// Create RTL cache
export const cacheRTL = createCache({
    key: "rtl",
    stylisPlugins: [rtlPlugin],
});
// Create LTR cache
export const cacheLTR = createCache({
    key: "ltr",
    stylisPlugins: [],
});
//Function to cache direction...
export const cacheValue = isLTR() ? cacheLTR : cacheRTL;
