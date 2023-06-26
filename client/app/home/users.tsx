import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Users() {
  return (
    <div className='flex min-h-screen flex-col my-32'>
      <div className='grid grid-cols-3 gap-4 h-screen'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-2xl text-primary'>I am a patient</h2>
          <Image
            className='hidden h-28 w-auto lg:block'
            src='/patient.png'
            alt='Your Company'
            width='800'
            height='800'
          />
          <Link
            href='/patient/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'
          >
            Start
          </Link>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-2xl text-primary'>
            I work in primary care
          </h2>
          <Image
            className='hidden h-28 w-auto lg:block'
            src='/junior.png'
            alt='Your Company'
            width='800'
            height='800'
          />
          <Link
            href='/junior-doctor/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'
          >
            Start
          </Link>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-2xl text-primary'>I am a Doctor</h2>
          <Image
            className='hidden h-28 w-auto lg:block'
            src='/doctor.png'
            alt='Your Company'
            width='800'
            height='800'
          />
          <Link
            href='/doctor/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 rounded'
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
