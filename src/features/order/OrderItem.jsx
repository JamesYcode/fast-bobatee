import { formatCurrency } from '../../utilities/helpers';

function OrderItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='space-y-1 py-3'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
