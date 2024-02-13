import { Response } from "@mongez/warlock";
import { User } from "../models/user";
export function updateLastActivityTime(response) {
    const currentUser = response.request.user;
    //
    if (!currentUser)
        return;
    // make sure it is done after the response is sent within 2 seconds so we don't slow down the response
    User.aggregate().where("id", currentUser.id).update({
        lastSeenAt: new Date(),
    });
}
Response.on("sending", updateLastActivityTime);
