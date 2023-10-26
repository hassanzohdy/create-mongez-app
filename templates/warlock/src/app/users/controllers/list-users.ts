import { Request, Response } from "@mongez/warlock";
import usersRepository from "../repositories/users-repository";

export default async function listUsers(request: Request, response: Response) {
  const { documents: users, paginationInfo } = await usersRepository.listActive(
    {
      ...request.all(),
      limit: 15,
    },
  );

  return response.success({
    users,
    paginationInfo,
  });
}
