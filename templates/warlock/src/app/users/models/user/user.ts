import {
  castEmail,
  Casts,
  CustomCasts,
  Document,
  expiresAfter,
} from "@mongez/monpulse";
import { Auth, uploadable } from "@mongez/warlock";
import castPassword from "app/users/utils/cast-password";
import UserOutput from "../../output/user-output";

export class User extends Auth {
  /**
   * Collection name
   */
  public static collection = "users";

  /**
   * Output
   */
  public static output = UserOutput;

  /**
   * {@inheritdoc}
   */
  public syncWith = [];

  /**
   * Get user type
   */
  public get userType(): string {
    return "user";
  }

  /**
   * {@inheritDoc}
   */
  public defaultValue: Document = {
    isActive: false,
  };

  /**
   * {@inheritDoc}
   */
  protected casts: Casts = {
    name: "string",
    firstName: "string",
    lastName: "string",
    gender: "string",
    isActive: "boolean",
    isAdmin: "boolean",
    birthDate: "date",
    lastSeenAt: "date",
    phoneNumber: "string",
    image: uploadable,
    email: castEmail,
    password: castPassword,
    activationCode: "int",
    codeExpiresAt: expiresAfter(30, "minutes"),
  };

  /**
   * Custom casts
   */
  protected customCasts: CustomCasts = {
    name: user => {
      const firstName = user.get("firstName");

      const lastName = user.get("lastName");

      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }

      return user.get("name");
    },
  };

  /**
   * {@inheritdoc}
   */
  public embedded = ["id", "name", "email", "phoneNumber"];
}
