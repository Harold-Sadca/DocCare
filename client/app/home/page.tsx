import Image from 'next/image';
import Footer from '../(components)/footer';
import Navbar from './navbar';
import Users from './users';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col box-border'>
      <div className='grid grid-cols-2 gap-4 h-screen'>
        <div className='flex flex-col items-center justify-evenly'>
          <div className='flex flex-row items-start justify-start'>
            <Image
              className='block h-28 w-auto lg:hidden'
              src='/logo-light.png'
              alt='Your Company'
              width='800'
              height='800'
            />
            <Image
              className='hidden h-28 w-auto lg:block'
              src='/logo-light.png'
              alt='Your Company'
              width='800'
              height='800'
            />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1>Connect wight top Rated Doctors</h1>
            <h2>Convenient way to get diagnosed quickly</h2>
            <div>
              <button className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'>
                Try for free
              </button>
              <button className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 m-2 border border-tertiary hover:border-transparent rounded'>
                See how it works
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center p-20 my-2 bg-primary'>
          <Navbar />
          {/* <img
            className='h-auto w-auto rounded'
            src='/doctor1.jpg'
            alt='Your Company'
          /> */}
        </div>
      </div>
      <Users />
      <Footer />
    </div>
  );
}
