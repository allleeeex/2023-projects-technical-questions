import { SetStateAction, Dispatch, FormEvent, useState } from "react";
import { TableContents } from "../Table/Table";

interface AlertModalProps {
  useContents: Dispatch<SetStateAction<TableContents>>,
}

export default function AlertModal({useContents}: AlertModalProps) {
  const [newPotentialAlert, setNewAlert] = useState('');

  function handleNewAlert(event: React.ChangeEvent<HTMLInputElement>) {
    setNewAlert(event.target.value);
  }

  function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAlert = newPotentialAlert;

    useContents(prev => ({
      ...prev,
      rowContents: [...prev.rowContents, {
        alert: newAlert,
        status: '',
        updates: []
      }]
    }));

    setNewAlert('');
  }

  return (
    <form data-testid='form' onSubmit={onSubmitEvent}>
      <label> Add new alert: </label>
      <input type='text' id='alert' name='alert' onChange={handleNewAlert} />
      <button type='submit'> Add </button>
    </form>
  )
}
