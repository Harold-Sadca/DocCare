import Image from 'next/image';
import Footer from '../(components)/footer';

export default function Login() {
  return (
    <>
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
          <div className='flex flex-col items-center justify-evenly'>
            <div className='flex flex-row items-start justify-start'>
              <Image
                className='block h-28 w-auto lg:hidden'
                src='/doctor-mobile.png'
                alt='Your Company'
                width='800'
                height='800'
              />
              <Image
                className='hidden h-28 w-auto lg:block'
                src='/doctor-mobile.png'
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
        </div>
      </div>
      <Footer />
    </>
  );
}
