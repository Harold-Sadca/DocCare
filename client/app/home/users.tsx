import Image from 'next/image';
import Footer from '../(components)/footer';
import Navbar from './navbar';

export default function Users() {
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='grid grid-cols-3 gap-4 h-screen'>
        <div className='flex flex-col items-center justify-evenly'>
          <div className='flex flex-col items-center justify-center'>
            <h2>I am a patient</h2>
            <Image
              className='hidden h-28 w-auto lg:block'
              src='/logo-light.png'
              alt='Your Company'
              width='800'
              height='800'
            />
            <button className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'>
              Let's Go
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly'>
          <div className='flex flex-col items-center justify-center'>
            <h2>I work in primary care</h2>
            <Image
              className='hidden h-28 w-auto lg:block'
              src='/logo-light.png'
              alt='Your Company'
              width='800'
              height='800'
            />
            <button className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'>
              Let's Go
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly'>
          <div className='flex flex-col items-center justify-center'>
            <h2>I am a Doctor</h2>
            <Image
              className='hidden h-28 w-auto lg:block'
              src='/logo-light.png'
              alt='Your Company'
              width='800'
              height='800'
            />
            <button className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'>
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
