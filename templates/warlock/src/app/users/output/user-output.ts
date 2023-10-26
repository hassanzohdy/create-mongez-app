import { FinalOutput, Output, UploadOutput } from "@mongez/warlock";
import { UsersGroupOutput } from "app/users-groups/output/users-group-output";
import { withBaseOutputDetails } from "app/utils/output";

export default class UserOutput extends Output {
  /**
   * Disabled keys from being returned in the final output
   */
  protected static disabledKeys: string[] = [];

  /**
   * The only allowed keys
   */
  protected static allowedKeys: string[] = [];

  /**
   * Output data
   */
  protected output: FinalOutput = withBaseOutputDetails({
    birthDate: "birthDate",
    name: "string",
    firstName: "string",
    lastName: "string",
    phoneNumber: "string",
    email: "string",
    image: UploadOutput,
    group: UsersGroupOutput,
  });

  /**
   * Defaults when key is missing from resource
   */
  protected defaults = {};

  /**
   * User type
   */
  protected userType = "user";
}
