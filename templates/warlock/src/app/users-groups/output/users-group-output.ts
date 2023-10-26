import { FinalOutput, Output } from "@mongez/warlock";
import { withBaseOutputDetails } from "app/utils/output";

export class UsersGroupOutput extends Output {
  /**
   * {@inheritdoc}
   */
  protected output: FinalOutput = withBaseOutputDetails({
    name: "string",
    permissions: "array",
    isActive: "boolean",
  });

  /**
   * Extend the resource output
   * Called after transforming the resource output
   */
  protected async extend() {
    //
  }
}
