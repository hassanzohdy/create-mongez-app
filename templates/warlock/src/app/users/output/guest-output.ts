import { FinalOutput } from "@mongez/warlock";
import UserOutput from "./user-output";

export default class GuestOutput extends UserOutput {
  /**
   * Output data
   */
  protected output: FinalOutput = {};

  /**
   * Defaults when key is missing from resource
   */
  protected defaults = {};

  /**
   * User type
   */
  protected userType = "guest";
}
