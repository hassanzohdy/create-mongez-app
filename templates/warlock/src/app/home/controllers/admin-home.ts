import { type Request, type Response } from "@mongez/warlock";

export default async function adminHome(request: Request, response: Response) {
  // your code here

  return response.success({});
}
