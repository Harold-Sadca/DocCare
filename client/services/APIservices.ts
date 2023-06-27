import axios, { AxiosResponse } from 'axios';
import {
  TypeDoctor,
  TypePatient,
  TypeJuniorDoctor,
  TypeMedicalInfo,
  TypeAppointment,
} from '../../server/types/types';
import {
  TypeResponseDoctor,
  TypeResponseJuniorDoctor,
  TypeResponsePatient,
  TypeResponseMedicalInfo,
  TypeResponseSummary,
  TypeLogin,
  TypeSummary,
  TPatient,
  TResponseUser,
  TypeResponseLastCheckup,
  TypeResponseAppointment,
  TUser,
  TypeResponseJuniorNotes,
} from '@/types/types';

const PORT = 'http://localhost:3001';

async function putData(path: string, content: TypePatient | TypeMedicalInfo) {
  return axios
    .put(PORT + path,JSON.stringify(content), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true
    })
    .then((res: AxiosResponse<TPatient>) => {
      return res.data;
    });
}

async function fetchData(path: string) {
  return axios
    .get(PORT + path, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res: AxiosResponse<TypeResponseDoctor | TypeResponsePatient>) => {
      return res.data;
    });
}

// messagesRouter.get('/messages', getMessages);
// messagesRouter.post('/message/:senderId', sendMessage);
// juniorDoctorRouter.get('/junior-doctor/:id', getJuniorDoctor);
// doctorRouter.get('/doctor/:id', getDoctor);
// doctorRouter.post('/doctor/login', loginDoctor )DONE
// doctorRouter.post('/doctor', createDoctor); DONE
// doctorRouter.get('/doctors', getDoctors);  DONE
// doctorRouter.put('/doctor/medical-info/:id', createMedicalInfo); DONE
// doctorRouter.put('/doctor/summary/:id', createPatientSummary); DONE
// juniorDoctorRouter.post('/junior-doctor/login', loginJuniorDoctor ) DONE
// juniorDoctorRouter.post('/junior-doctor/:id/note',juniorDoctorAuthMiddleware, createJuniorNote); DONE
// patientRouter.post('/patient', createPatient); DONE
// patientRouter.get('/patients', getPatients); DONE
// patientRouter.put('/patient/:id', updatePatient); DONE
// patientRouter.delete('/patient/:id', deletePatient); DONE
// patientRouter.get('/patient/:id/last-checkup', getLastCheckup); DONE
// patientRouter.post('/patient/appointment/:id', createAppointment); DONE

async function register(user: TUser, type: string): Promise<TResponseUser> {
  console.log(user);
  let path;
  if (type == 'doctor') {
    path = '/doctor';
  } else if (type == 'patient') {
    path = '/patient';
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor';
  }
  return axios
    .post(PORT + path + '/register', JSON.stringify(user), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TResponseUser>) => {
      console.log(res);
      return res.data;
    });
}

async function login(user: TypeLogin, type: string): Promise<TResponseUser> {
  let path;
  if (type == 'doctor') {
    path = '/doctor';
  } else if (type == 'patient') {
    path = '/patient';
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor';
  }
  console.log(user);
  console.log(type);
  return axios
    .post(PORT + path + '/login', JSON.stringify(user), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TResponseUser>) => {
      console.log(res);
      return res.data;
    });
}

async function getAllDoctors(): Promise<
  TypeResponseDoctor | TypeResponsePatient
> {
  return fetchData('/doctors');
}

async function getMedicalInfo(
  patientId: string,
  medicalInfo: TypeMedicalInfo
): Promise<TypeResponseMedicalInfo> {
  return axios
    .put(`${PORT}/doctor/medical-info/${patientId}`,JSON.stringify(medicalInfo), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true
    })
    .then((res: AxiosResponse<TypeResponseMedicalInfo>) => {
      return res.data;
    });
}

async function createPatientSummary(
  patientId: string,
  summary: TypeSummary
): Promise<TypeResponseSummary> {
  return axios
    .put(`${PORT}/doctor/summary/${patientId}`,JSON.stringify(summary), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true,
    })
    .then((res: AxiosResponse<TypeResponseSummary>) => {
      return res.data;
    });
}

async function getAllPatients(): Promise<
  TypeResponseDoctor | TypeResponsePatient
> {
  return fetchData('/patients');
}

async function editPatientDetails(
  patientId: string,
  patientDetails: TypePatient
): Promise<TPatient> {
  return putData(`/patient/${patientId}`, patientDetails);
}

async function deletePatient(patientId: string): Promise<TypeResponsePatient> {
  return axios
    .get(`${PORT}/patient/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true
    })
    .then((res: AxiosResponse<TypeResponsePatient>) => {
      return res.data;
    });
}

async function getLastCheckup(
  patientId: string
): Promise<TypeResponseLastCheckup> {
  return axios
    .delete(`${PORT}/patient/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true
    })
    .then((res: AxiosResponse<TypeResponseLastCheckup>) => {
      return res.data;
    });
}

async function createAppointment(
  patientId: string,
  appointment: TypeAppointment
): Promise<TypeResponseAppointment> {
  return axios
    .post(`${PORT}/patient/appointment/${patientId}`,JSON.stringify(appointment), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true,
    })
    .then((res: AxiosResponse<TypeResponseAppointment>) => {
      return res.data;
    });
}

async function createJuniorNote(
  juniorID: string,
  juniorNote: string
): Promise<TypeResponseJuniorNotes> {
  return axios
    .post(`${PORT}/patient/appointment/${juniorID}`,JSON.stringify(juniorNote), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials:true,
    })
    .then((res: AxiosResponse<TypeResponseJuniorNotes>) => {
      return res.data;
    });
}

const apiService = {
  register,
  login,
  getAllDoctors,
  getAllPatients,
  getMedicalInfo,
  createPatientSummary,
  editPatientDetails,
  deletePatient,
  getLastCheckup,
  createAppointment,
  createJuniorNote,
};

export default apiService;
