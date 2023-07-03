/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Users() {
  return (
    <main>
      <div className='grid-users'>
        <div className='users users-left'>
          <h2 className='font-bold text-2xl text-primary mb-4'>
            I am a patient
          </h2>
          <Image
            className=''
            src='/patient.png'
            alt='Patient'
            height={300}
            width={300}
          />
          <Link
            href='/patient/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 mt-4 rounded'
          >
            Let's go
          </Link>
        </div>

        <div className='users users-center'>
          <h2 className='font-bold text-2xl text-primary mb-4'>
            I work in primary care
          </h2>
          <Image
            className=''
            src='/junior.png'
            alt='Junior Doctor'
            height={300}
            width={300}
          />
          <Link
            href='/junior-doctor/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 mt-4 rounded'
          >
            Let's go
          </Link>
        </div>

        <div className='users users-right'>
          <h2 className='font-bold text-2xl text-primary mb-4'>
            I am a Doctor
          </h2>
          <Image
            className=''
            src='/doctor.png'
            alt='Doctor'
            height={300}
            width={300}
          />
          <Link
            href='/doctor/login'
            className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 m-2 mt-4 rounded'
          >
            Let's go
          </Link>
        </div>
      </div>
    </main>
  );
}
