import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiData';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers';
import { useEffect } from 'react';
import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  // console.log(fetcher);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  const {
    id,
    // ! Hacky way. Normally need a status state. Need to remodel data.
    // status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h2 className='text-xl font-semibold'>Order #{id} status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
              Priority
            </span>
          )}
          <span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
            {deliveryIn >= 0 ? `Preparing` : `Delivered`} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-4 bg-stone-200 px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-sm text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='divide-y divide-stone-200 border-b border-t'>
        {cart.map((item) => (
          <OrderItem item={item} key={item.bobaId} />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Price Boba: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// * React Router Dom gives this param parameter, so we can use the params in the url.
// eslint-disable-next-line react-refresh/only-export-components
export async function loader(params) {
  const order = await getOrder(params.params.orderId);
  // console.log(order);
  return order;
}

export default Order;
