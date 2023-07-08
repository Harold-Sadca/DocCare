import axios, { AxiosResponse } from 'axios';
import {
  TypeDoctor,
  TypePatient,
  TypeMedicalInfo,
  TypeAppointment,
  TypeMessage,
} from '../../server/types/types';
import {
  TypeResponsePatient,
  TypeResponseMedicalInfo,
  TypeResponseSummary,
  TypeLogin,
  TypeSummary,
  TPatient,
  TypeRegister,
  TypeResponseLastCheckup,
  TUser,
  TypeResponseJuniorNotes,
} from '@/types/types';

const PORT = process.env.PORT || 'http://localhost:3001';
const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

async function editPatientDetails(
  patientId: string,
  patientDetails: TypePatient,
  token: string
) {
  return axios
    .put(`${PORT}/patients/logout/${patientId}`, patientDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

async function addJuniorNote(
  patientId: string,
  juniorNote: string,
  token: string
) {
  return axios
    .put(
      `${PORT}/junior-doctor/note/${patientId}`,
      { juniorNote },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

async function logoutPatient(patientId: string, patientDetails: TypePatient) {
  return axios
    .put(
      `${PORT}/patients/logout/${patientId}`,
      JSON.stringify(patientDetails),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse<TPatient>) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

async function fetchData(token: string, path: string) {
  return axios
    .get(`${PORT}/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypePatient[] | TypeDoctor[]>) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

async function register(user: TUser, type: string) {
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
    .then((res: AxiosResponse<TypeRegister>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

async function saveImage(imageData: {}) {
  return axios
    .post(endpoint, imageData)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => console.log(error));
}

async function login(user: TypeLogin, type: string) {
  let path;
  if (type == 'doctor') {
    path = '/doctor';
  } else if (type == 'patient') {
    path = '/patient';
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor';
  }
  return axios
    .post(PORT + path + '/login', JSON.stringify(user), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getAllDoctors(token: string) {
  return fetchData(token, 'doctors');
}

async function getMedicalInfo(
  patientId: string,
  medicalInfo: TypeMedicalInfo,
  token: string
): Promise<TypeResponseMedicalInfo> {
  return axios
    .put(`${PORT}/doctor/medical-info/${patientId}`, medicalInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function createPatientSummary(
  patientId: string,
  summary: TypeSummary,
  token: string
): Promise<TypeResponseSummary> {
  console.log(summary);
  return axios
    .put(`${PORT}/doctor/summary/${patientId}`, summary, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getAllPatients(token: string) {
  return fetchData(token, 'patients');
}

async function deletePatient(patientId: string): Promise<TypeResponsePatient> {
  return axios
    .get(`${PORT}/patient/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponsePatient>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getLastCheckup(
  patientId: string
): Promise<TypeResponseLastCheckup> {
  return axios
    .get(`${PORT}/patient/last-checkup/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponseLastCheckup>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function createAppointment(
  patientId: string,
  appointment: TypeAppointment,
  doctorId: string
) {
  return axios
    .post(
      `${PORT}/patient/appointment/${patientId}`,
      JSON.stringify({ appointment, doctorId }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function attendAppointment(
  appointmentId: string,
  token: string
): Promise<TypeResponseJuniorNotes> {
  console.log(token);
  return axios
    .put(`${PORT}/doctor/attend/${appointmentId}`, JSON.stringify({}), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponseJuniorNotes>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getUser(token: string, user: string) {
  return axios
    .get(`${PORT}/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function createJuniorNote(
  juniorID: string,
  juniorNote: string
): Promise<TypeResponseJuniorNotes> {
  return axios
    .post(
      `${PORT}/patient/appointment/${juniorID}`,
      JSON.stringify(juniorNote),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse<TypeResponseJuniorNotes>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getAllMessages() {
  return axios
    .get(`${PORT}/messages`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeMessage[]>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
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
  getUser,
  createJuniorNote,
  saveImage,
  attendAppointment,
  logoutPatient,
  getAllMessages,
  addJuniorNote,
};

export default apiService;
