import { UsersGroup } from "./user-group";

export const UsersGroupBlueprint = UsersGroup.blueprint();

export async function usersGroupMigration() {
  await UsersGroupBlueprint.unique("id");
}

usersGroupMigration.blueprint = UsersGroupBlueprint;

usersGroupMigration.down = async () => {
  await UsersGroupBlueprint.dropUniqueIndex("id");
};
