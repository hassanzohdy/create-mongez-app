import { Guest as BaseGuest } from "@mongez/warlock";
import GuestOutput from "app/users/output/guest-output";

export class Guests extends BaseGuest {
  /**
   * {@inheritDoc}
   */
  public async toJSON() {
    return await new GuestOutput(this).toJSON();
  }
}
