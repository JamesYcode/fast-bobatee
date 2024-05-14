import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
import { addItem, getCurrentQtyById } from '../cart/cartSlice';
import Button from '../../ui/Buttton';
import UpdateItemQty from '../cart/UpdateItemQty';

function MenuItem({ boba }) {
  const { id, name, unitPrice, soldOut, imageUrl } = boba;

  const dispatch = useDispatch();
  const currentQty = useSelector(getCurrentQtyById(id));
  const isInCart = currentQty > 0;

  function handleAddToCart() {
    const newitem = {
      bobaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newitem));
  }
  return (
    <li className='flex gap-4 py-2'>
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>

        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQty qty={currentQty} bobaId={id} />
              {/* <DeleteItem bobaId={id} /> */}
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type='small'>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
