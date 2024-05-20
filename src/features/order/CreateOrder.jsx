/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiData.js';
import Loading from '../../ui/Loading';

import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store.js';
import {
  estimatedDeliveryTime,
  formatCurrency,
  generateUID,
} from '../../utilities/helpers';
import Button from '../../ui/Buttton.jsx';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus, // renamed to addressStatus
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isSubmitting = navigation.state === 'submitting';
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === 'loading';

  if (!cart.length) return <EmptyCart />;
  return (
    <div className='px-4 py-6'>
      {isSubmitting && <Loading />}
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form autoComplete='off' method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            defaultValue={username.charAt(0).toUpperCase() + username.slice(1)}
            className='input grow'
            type='text'
            name='customer'
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            ⚡ Priority
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          <input type='hidden' name='totalCartPrice' value={totalCartPrice} />

          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now  from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);
  const orderNumber = generateUID();

  const standardProcessingTimeMin = Math.floor(Math.random() * 9) + 2; // 2-10 minutes
  const standardDeliveryTimeMin = Math.floor(Math.random() * 11) + 5; // 5-15 minutes

  const priorityProcessingTimeMin = Math.floor(Math.random() * 3) + 1; // 1-3 minutes
  const priorityDeliveryTimeMin = Math.floor(Math.random() * 6) + 3; // 3-8 minutes

  // Check if the order is a priority order
  const isPriority = data.priority === 'true';

  // Calculate processing and delivery times based on priority
  const processingTimeInMin = isPriority
    ? priorityProcessingTimeMin
    : standardProcessingTimeMin;

  const delieryTimeInMin = isPriority
    ? priorityDeliveryTimeMin
    : standardDeliveryTimeMin;

  // Extract total cart price
  const totalCartPrice = parseInt(data.totalCartPrice);

  // Calculate priorityPrice
  const priorityPrice = data.priority ? totalCartPrice * 0.2 : 0;

  // Calculate totalPrice
  const totalPrice = totalCartPrice + priorityPrice;

  // console.log(totalCartPrice, priorityPrice, totalPrice);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
    id: orderNumber,
    estimatedDelivery: estimatedDeliveryTime(
      processingTimeInMin,
      delieryTimeInMin
    ),
    priorityPrice: priorityPrice,
    orderPrice: totalPrice,
    // status: 'Preparing',
  };
  // console.log(order);

  // * Error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please enter a valid phone number.';
  if (Object.keys(errors).length > 0) return errors;
  // * If everything is ok, create new order and redirect
  const newOrder = await createOrder(order);

  // ! Do not overuse! It deactivates couple of performance optimization of redux
  // ? Hacky way
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
  // ! Testing method. Uncomment above code for actual use.
  // return null;
}

export default CreateOrder;
