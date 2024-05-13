import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
import { addItem } from '../cart/cartSlice';
import Button from '../../ui/Buttton';

function MenuItem({ boba }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = boba;

  const dispatch = useDispatch();

  function handleAddToCart() {
    const newitem = {
      bobbaId: id,
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
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {!soldOut && (
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