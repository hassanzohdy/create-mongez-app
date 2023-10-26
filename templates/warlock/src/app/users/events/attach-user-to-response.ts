import { Response } from "@mongez/warlock";

export function attachCurrentUserToResponse(response: Response) {
  const responseData = response.body;
  if (typeof responseData === "string") return;

  if (!responseData || responseData.user) return;

  const currentUser = response.request.user;

  if (!currentUser) return;

  responseData.user = currentUser;
}

// add current user to response
Response.on("sending", attachCurrentUserToResponse);
