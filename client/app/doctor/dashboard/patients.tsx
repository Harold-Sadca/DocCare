'use client';

import { TypePatient } from '@/../server/types/types';
import apiService from '@/services/APIservices';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Patients() {
  const router = useRouter();
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);

  async function getAllPatients() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const patients = await apiService
          .getAllPatients(token)
          .then((allThePatients) => {
            setAllPatients([...allThePatients]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <main>
      <div className='patients'>
        {allPatients.slice(0, 3).map((patient, idx) => (
          <div key={idx}>
            <p>{patient.name}</p>
          </div>
        ))}
        <button
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
          onClick={() => router.push('/doctor/dashboard/patients')}
        >
          See all
        </button>
      </div>
    </main>
  );
}
