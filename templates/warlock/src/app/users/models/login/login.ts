import { Casts, Model } from "@mongez/monpulse";

export class Login extends Model {
  /**
   * Collection name
   */
  public static collection = "logins";

  /**
   * {@inheritDoc}
   */
  protected casts: Casts = {};
}
