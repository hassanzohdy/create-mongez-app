import { emailColumn, idColumn, Table, textColumn } from "@mongez/moonlight";
import { useState } from "react";

const user = (id: number, name: string, email: string) => ({ id, name, email });

const dataList = [
  user(1, "Hasan", "hassanzohdy@gmail.com"),
  user(2, "Hasan II", "hassanzohdy@gmail.com"),
  user(3, "Hasan III", "hassanzohdy@gmail.com"),
];

const columns = [
  idColumn(),
  textColumn("name").sortable(),
  emailColumn("email").sortable(),
];

const filters = [];

export default function TestTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(dataList);
  return (
    <Table
      role=""
      name="test"
      columns={columns}
      filters={filters}
      data={data}
    />
  );
}
