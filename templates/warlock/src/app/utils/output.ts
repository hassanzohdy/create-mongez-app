import { FinalOutput } from "@mongez/warlock";
import UserOutput from "app/users/output/user-output";

export function withBaseOutputDetails(moreOptions: FinalOutput): FinalOutput {
  return {
    id: "integer",
    isActive: "boolean",
    createdAt: "date",
    updatedAt: "date",
    createdBy: UserOutput,
    updatedBy: UserOutput,
    ...moreOptions,
  };
}
