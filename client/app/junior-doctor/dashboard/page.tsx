/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import '../../css/junior-doctor.css';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { TypePatient } from '../../../../server/types/types';
import AllPatients from './patients';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { displayChat } from '@/redux/features/display-chat';
import { setAllPatient } from '@/redux/features/all-patients-slice';
import { TUser } from '@/types/types';
import JuniorDoctorMessages from './messages';
import { io } from 'socket.io-client';
import LoadingSpinner from '@/app/(components)/loading';
const socket = io('ws://localhost:3001');

export default function JuniorDoctorDashBoard() {
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);
  const [onlinePatientsId, setOnlinePatientsId] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [logged, setLogged] = useState<Boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const displayChat = useAppSelector((state) => state.toggleDisplayChat.value);
  const currentJunior = useAppSelector(
    (state) => state.currentJuniorReducer.value
  );

  async function getPatients(token: string) {
    const patients = (await apiService.getAllPatients(token)) as TypePatient[];
    setAllPatients(patients);
    const ids = patients.map((patient) => {
      if (patient.status === 'Online') {
        return patient.id;
      }
    });
    setOnlinePatientsId(ids as string[]);
    setLoaded(true);
  }

  useEffect(() => {
    socketConnect();
  }, []);

  function socketConnect() {
    socket.auth = { name: 'junior' };
    socket.connect();
  }

  useEffect(() => {
    const token =
      typeof window !== 'undefined' &&
      (localStorage.getItem('accessToken') as string);
    const userType =
      typeof window !== 'undefined' &&
      (window.localStorage.getItem('userType') as string);
    if (token && userType === 'junior-doctor') {
      getPatients(token);
    }
  }, [logged]);

  socket.on('patient logged', () => {
    console.log('logged');
    setLogged(!logged);
  });

  return (
    <div>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      <div>
        {loaded ? (
          <div className='messages-container-juniorDoctor'>
            <AllPatients allPatients={allPatients} />
            {displayChat && (
              <JuniorDoctorMessages currentJunior={currentJunior as TUser} />
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
