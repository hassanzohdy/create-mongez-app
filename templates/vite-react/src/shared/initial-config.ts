import {
  EncryptedLocalStorageDriver,
  PlainLocalStorageDriver,
  setCacheConfigurations,
} from "@mongez/cache";
import {
  decrypt,
  encrypt,
  setEncryptionConfigurations,
} from "@mongez/encryption";
import { AES } from "crypto-js";
import { appCode, __DEV__ } from "./flags";

const cacheDriver = __DEV__
  ? new PlainLocalStorageDriver()
  : new EncryptedLocalStorageDriver();

setEncryptionConfigurations({
  key: appCode,
  driver: AES,
});

setCacheConfigurations({
  prefix: appCode,
  driver: cacheDriver,
  encryption: {
    encrypt,
    decrypt,
  },
});
