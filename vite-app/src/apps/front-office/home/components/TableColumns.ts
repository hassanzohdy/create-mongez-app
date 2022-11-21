import {
  actionsColumn,
  avatarColumn,
  emailColumn,
  idColumn,
  statusColumn,
  textColumn,
} from "apps/front-office/design-system/components/Table/TableColumns";
import { TableColumn } from "apps/front-office/design-system/components/Table/TableProps";

export const columns: TableColumn[] = [
  idColumn(),
  avatarColumn("user", "image.url"),
  textColumn("phoneNumber"),
  emailColumn(),
  statusColumn("status", "status", {
    active: "green",
    suspended: "red",
  }),
  actionsColumn(),
];
