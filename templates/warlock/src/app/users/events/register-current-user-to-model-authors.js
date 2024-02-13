/**
 * This event is responsible for adding the current user to any model that is being saved
 * Such as createdBy and updatedBy so you don't need to add it manually.
 */
import { Model } from "@mongez/monpulse";
import { isEmpty } from "@mongez/supportive-is";
import { requestContext } from "@mongez/warlock";
export function registerCurrentUserToModelActions() {
    Model.events()
        .onSaving((model, oldModel) => {
        const { request } = requestContext();
        const user = request === null || request === void 0 ? void 0 : request.user;
        if (!user)
            return;
        if (!oldModel && isEmpty(model.get("createdBy"))) {
            model.set("createdBy", user.embeddedData);
        }
        model.set("updatedBy", user.embeddedData);
    })
        .onDeleting((model) => {
        const { request } = requestContext();
        const user = request === null || request === void 0 ? void 0 : request.user;
        if (!user || user.userType === "guest")
            return;
        model.set("deletedBy", user.embeddedData);
    });
}
// add createdBy, updatedBy and deletedBy to each model create|update|delete
registerCurrentUserToModelActions();
