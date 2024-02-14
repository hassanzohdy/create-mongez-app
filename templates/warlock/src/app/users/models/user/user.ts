import { castEmail, Casts, Document, expiresAfter } from "@mongez/monpulse";
import { Auth, castPassword, uploadable } from "@mongez/warlock";
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
    isActive: "boolean",
    image: uploadable,
    email: castEmail,
    password: castPassword,
    activationCode: "int",
    codeExpiresAt: expiresAfter(30, "minutes"),
  };

  /**
   * {@inheritdoc}
   */
  public embedded = ["id", "name", "email"];
}
