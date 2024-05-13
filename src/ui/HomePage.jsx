import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Buttton';

function HomePage() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className='my-10 px-4 sm:my-16'>
      <h1 className='mb-8 text-center text-xl font-semibold uppercase md:text-3xl'>
        <span className='text-stone-700'>Best Tasting Bubble Tea.</span>
        <br />
        <span className='text-violet-300'>Naturally Flavored</span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <div className='text-center'>
          <Button to='/menu' type='primary'>
            To Menu
          </Button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
