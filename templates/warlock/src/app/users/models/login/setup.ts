import { Login } from "./login";

export const loginBlueprint = Login.blueprint();

export async function loginMigration() {
  await loginBlueprint.unique("id");
  await loginBlueprint.index("createdBy.id");
  await loginBlueprint.index("type");
  await loginBlueprint.index("typeId");
}

loginMigration.blueprint = loginBlueprint;

loginMigration.down = async () => {
  await loginBlueprint.dropUniqueIndex("id");
  await loginBlueprint.dropIndex("createdBy.id");
  await loginBlueprint.dropIndex("type");
  await loginBlueprint.dropIndex("typeId");
};
