import { useDispatch, useSelector } from 'react-redux';
import LinkButton from '../../ui/LinkButton';
import { getUsername } from '../user/userSlice';
import { clearCart, getCart } from './cartSlice';
import Button from '../../ui/Buttton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>
        Your cart, {username.charAt(0).toUpperCase() + username.slice(1)}
      </h2>
      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.bobaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button type='primary' to='/order/new'>
          Order
        </Button>
        <Button onClick={handleClearCart} type='secondary'>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
