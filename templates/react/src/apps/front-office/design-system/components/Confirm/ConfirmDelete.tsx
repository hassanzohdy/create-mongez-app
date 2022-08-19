import { DeleteButton } from "app/design-system/components/Button";
import { useState } from "react";
import Confirm from ".";
import { toastSuccess } from "../Toast";

export default function ConfirmDelete({
  record,
  records,
  deleteMessage,
  recordIndex,
  service,
  setRecords,
}: any) {
  const [confirming, setConfirming] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState<any>({
    recordId: null,
    recordIndex: -1,
  });

  const confirmDelete = () => {
    records.splice(deletingRecord.recordIndex, 1);

    service.delete(deletingRecord.recordId);
    toastSuccess(deleteMessage);

    setRecords([...records]);

    setDeletingRecord({
      recordId: null,
      recordIndex: -1,
    });
  };

  return (
    <>
      <DeleteButton
        onClick={() => {
          setConfirming(true);
          setDeletingRecord({
            recordId: record.id,
            recordIndex: recordIndex,
          });
        }}>
        Delete
      </DeleteButton>
      <Confirm
        open={confirming}
        header={<h4>Delete Confirm</h4>}
        color="red"
        message="Are you sure you want to delete this record?"
        onClose={() => setConfirming(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

ConfirmDelete.defaultProps = {
  deleteMessage: "Record Has Been Deleted Successfully!",
};
