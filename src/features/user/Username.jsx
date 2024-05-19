import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((store) => store.user.username);
  // * Allows search bar component to be either in the middle if there is a username or right side if there is no username
  if (!username) return null;
  return (
    <div className='hidden text-sm font-semibold md:block'>{username}</div>
  );
}

export default Username;
