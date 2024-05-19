import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Buttton';
import video from '../assets/video.mp4';

function HomePage() {
  const username = useSelector((store) => store.user.username);
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        className='w-full h-screen object-cover'
        src={video}
      ></video>
      <div className='absolute top-48 left-0 right-0 my-10 px-4 sm:my-16 '>
        <h1 className='mt-8 mb-8 text-center text-xl font-semibold uppercase md:text-4xl'>
          <span className='text-stone-700 '>Best Tasting Bubble Tea.</span>
          <br />
          <span className='text-violet-300 md:text-3xl'>
            Naturally Flavored
          </span>
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
    </div>
  );
}

export default HomePage;
