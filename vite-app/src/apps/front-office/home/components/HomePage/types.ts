// useFormRows Hook types
export type FormRowsOptions = {
  /**
   * Initial rows
   */
  initial?: any[];
  /**
   * this will be called when the addRow callback is called
   */
  addRow?: (rows: any[]) => any;
  /**
   * Called after the row is added
   */
  onAdd?: (mewRow: any, newRowIndex: number, rows: any[]) => void;
  /**
   * Called after the row is removed
   */
  onDelete?: (row: any, index: number, rows: any[]) => void;
  /**
   * Called on row change
   */
  onUpdate?: (row: any, index: number, rows: any[]) => void;
  /**
   * Called when row is added, updated or removed
   */
  onChange?: (
    row: any,
    state: "add" | "update" | "delete",
    index: number,
    rows: any[],
  ) => void;
};

export type RowHandler = {
  /**
   * Row data
   */
  data: any;
  /**
   * Row index
   */
  index: number;
  /**
   * Row unique key, use it as the key prop in the row component
   */
  key: string;
  /**
   * Remove the row callback, just pass it to the `onClick` prop or whatever you want
   */
  remove: () => void;
  /**
   * Update row data
   */
  update: (newData: any) => void;
  Row: React.ComponentType<{ children: React.ReactNode }>;
};
