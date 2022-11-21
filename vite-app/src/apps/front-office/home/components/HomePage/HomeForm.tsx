import { useCachedRows, useFormRows } from "@mongez/react-hooks";

export default function HomeForm() {
  const [rows, addRow] = useFormRows({
    initial: [],
    addRow: () => ({
      name: "",
      price: "",
    }),
  });

  const rowsList = useCachedRows(rows, ({ key, remove, update, data }) => (
    <div key={key}>
      <input
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={e =>
          update({
            ...data,
            name: e.target.value,
          })
        }
      />
      <input type="text" placeholder="Price" defaultValue={data.price} />

      <button type="button" onClick={remove}>
        Delete
      </button>
    </div>
  ));

  return (
    <>
      {rowsList}

      <button type="button" onClick={addRow}>
        Add
      </button>
    </>
  );
}
