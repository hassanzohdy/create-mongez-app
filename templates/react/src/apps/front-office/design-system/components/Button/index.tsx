export default function BaseButton(props: any) {
  return <button {...props} />;
}

export function PrimaryButton(props: any) {
  return <button {...props} />;
}

export function AddButton(props: any) {
  return (
    <>
      <button {...props}>Add Button</button>
    </>
  );
}

export function EditButton(props: any) {
  return (
    <>
      <button {...props}>Edit Button</button>
    </>
  );
}

export function DeleteButton(props: any) {
  return (
    <>
      <button {...props}>Delete Button</button>
    </>
  );
}

export function ViewButton(props: any) {
  return (
    <>
      <button {...props}>View Button</button>
    </>
  );
}
