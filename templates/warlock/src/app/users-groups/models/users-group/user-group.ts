import { Casts, Document, Model, ModelSync } from "@mongez/monpulse";
import { User } from "app/users/models/user";
import { UsersGroupOutput } from "../../output/users-group-output";

export class UsersGroup extends Model {
  /**
   * Collection name
   */
  public static collection = "usersGroup";

  /**
   * Output class
   */
  public static output = UsersGroupOutput;

  /**
   * {@inheritDoc}
   */
  public syncWith: ModelSync[] = [User.sync("group").unsetOnDelete()];

  /**
   * Default value for model data
   * Works only when creating new records
   */
  public defaultValue: Document = {};

  /**
   * Cast data types before saving documents into database
   */
  protected casts: Casts = {
    name: "string",
    permissions: "array",
    isActive: "boolean",
  };

  /**
   * {@inheritDoc}
   */
  public embedded: string[] = ["id", "name", "permissions"];
}
