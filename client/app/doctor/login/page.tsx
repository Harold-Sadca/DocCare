import Image from 'next/image';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';

export default function Login() {
  return (
    <>
      <Navbar />
      <div className='flex min-h-screen flex-col'>
        <div className='grid grid-cols-2 gap-4 h-screen'>
          <div className='flex flex-col items-center justify-evenly'>
            <div className='flex flex-row items-start justify-start'>
              <img
                className='h-auto w-44 rounded'
                src='/doctor-mobile.png'
                alt='Your Company'
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl text-primary'>Login</h2>
            <h3>Explore the future with us.</h3>
            <form
              className='flex flex-col items-start justify-center p-4'
              action='/send-data-here'
              method='post'
            >
              <label htmlFor='email'>Email:</label>
              <input type='email' id='first' name='first' />
              <label htmlFor='password'>Password:</label>
              <input type='password' id='last' name='last' />
              <button
                className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
                type='submit'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
