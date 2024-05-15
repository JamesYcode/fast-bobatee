import { useDispatch } from 'react-redux';
import Button from '../../ui/Buttton';
import { deleteItem } from './cartSlice';

function DeleteItem({ bobaId }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteItem(bobaId));
  }

  return (
    <Button type='small' onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteItem;
