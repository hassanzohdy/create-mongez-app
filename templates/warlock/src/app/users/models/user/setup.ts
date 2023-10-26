import { User } from "./user";

const UserBlueprint = User.blueprint();

export async function userMigrations() {
  await UserBlueprint.unique("id");
  await UserBlueprint.unique("email");
  await UserBlueprint.index("name");
  await UserBlueprint.index("isActive");
  await UserBlueprint.index("isAdmin");
  await UserBlueprint.index("isCustomer");
  await UserBlueprint.index("isVendor");
  await UserBlueprint.unique("phoneNumber");
}

userMigrations.blueprint = UserBlueprint;

userMigrations.down = async () => {
  await UserBlueprint.dropUniqueIndex("id");
  await UserBlueprint.dropUniqueIndex("email");
  await UserBlueprint.dropUniqueIndex("phoneNumber");
  await UserBlueprint.dropIndex("name");
  await UserBlueprint.dropIndex("isActive");
  await UserBlueprint.dropIndex("isAdmin");
  await UserBlueprint.dropIndex("isCustomer");
  await UserBlueprint.dropIndex("isVendor");
};
