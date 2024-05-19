import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import CartOverview from '../features/cart/CartOverview';

function AppLayout() {
  // * Three stages in useNavigation. Idle, Submitting, Loading
  const navigation = useNavigation();

  // * Returns the current location object, which represents the current URL in web browsers.
  const location = useLocation();

  const isLoading = navigation.state === 'loading';
  const isRootPath = location.pathname === '/';

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loading />}
      <Header />
      <div className={!isRootPath ? 'overflow-scroll' : 'overflow-hidden'}>
        <main className={!isRootPath ? 'mx-auto max-w-3xl' : ''}>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
