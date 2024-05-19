import { Link } from 'react-router-dom';
import Username from '../features/user/Username';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header className='flex items-center justify-between border-b border-stone-200 bg-yellow-200 px-4 py-3 uppercase sm:px-6'>
      <Link to='/'>Fast BobaTea</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
