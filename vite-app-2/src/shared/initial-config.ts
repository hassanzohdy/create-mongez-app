import {
  EncryptedLocalStorageDriver,
  PlainLocalStorageDriver,
  setCacheConfigurations,
} from "@mongez/cache";
import { decrypt, encrypt } from "@mongez/encryption";
import { setAppConfigurations } from "@mongez/react";
import { AES } from "crypto-js";
import { appCode, __DEV__ } from "./flags";

const cacheDriver = __DEV__
  ? new PlainLocalStorageDriver()
  : new EncryptedLocalStorageDriver();

setAppConfigurations({
  encryption: {
    key: appCode,
    driver: AES,
  },
});

setCacheConfigurations({
  prefix: appCode,
  driver: cacheDriver,
  encryption: {
    encrypt,
    decrypt,
  },
});
