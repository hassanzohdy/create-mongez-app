import UserOutput from "app/users/output/user-output";
/**
 * Merge the output with this function will return the base output details
 * Only and only if any of these keys are present
 */
export function withBaseOutputDetails(moreOptions) {
    return Object.assign({ id: "integer", isActive: "boolean", createdAt: "date", updatedAt: "date", createdBy: UserOutput, updatedBy: UserOutput }, moreOptions);
}
