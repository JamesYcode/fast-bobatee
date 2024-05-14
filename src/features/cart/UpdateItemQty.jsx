import { useDispatch } from 'react-redux';
import { decreaseItemQty, increaseItemQty } from './cartSlice';
import Button from '../../ui/Buttton';

function UpdateItemQty({ bobaId, qty }) {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increaseItemQty(bobaId));
  }
  function handleDecrement() {
    dispatch(decreaseItemQty(bobaId));
  }

  return (
    <div className='flex items-center gap-2 md:gap-4'>
      {qty !== 1 && (
        <Button onClick={handleDecrement} type='round'>
          -
        </Button>
      )}
      {qty !== 1 && <span className='text-sm font-medium'>{qty}</span>}
      <Button onClick={handleIncrement} type='round'>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQty;
