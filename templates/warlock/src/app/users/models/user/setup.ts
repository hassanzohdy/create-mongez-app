import { User } from "./user";

const UserBlueprint = User.blueprint();

export async function userMigrations() {
  await UserBlueprint.unique("id");
  await UserBlueprint.unique("email");
  await UserBlueprint.index("isActive");
  await UserBlueprint.unique("phoneNumber");
}

userMigrations.blueprint = UserBlueprint;

userMigrations.down = async () => {
  await UserBlueprint.dropUniqueIndex("id");
  await UserBlueprint.dropUniqueIndex("email");
  await UserBlueprint.dropIndex("isActive");
  await UserBlueprint.dropUniqueIndex("phoneNumber");
};
