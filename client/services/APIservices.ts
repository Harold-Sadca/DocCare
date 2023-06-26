import axios, {AxiosResponse} from "axios";
import {TypeDoctor, TypePatient, TypeJuniorDoctor, TypeMedicalInfo, TypeAppointment} from '../../server/types/types'
import { TypeResponseDoctor,
  TypeResponseJuniorDoctor,
  TypeResponsePatient,
  TypeResponseMedicalInfo,
  TypeResponseSummary,
  TypeLogin,
  TypeSummary,
  TPatient,
  TResponseUser,
  TypeResponseLastCheckup,
  TypeResponseAppointment
} from "@/types/types";
import { type } from "os";

const PORT = 'http://localhost:3001'

// doctorRouter.post('/doctor', createDoctor); DONE
// doctorRouter.get('/doctor/:id', getDoctor);
// doctorRouter.get('/doctors', getDoctors);  DONE
// doctorRouter.put('/doctor/medical-info/:id', createMedicalInfo); DONE
// doctorRouter.put('/doctor/summary/:id', createPatientSummary); DONE
// messagesRouter.post('/message/:senderId', sendMessage);
// messagesRouter.get('/messages', getMessages);
// juniorDoctorRouter.post('/junior-doctor', createJuniorDoctor); DONE
// juniorDoctorRouter.get('/junior-doctor/:id', getJuniorDoctor);
// juniorDoctorRouter.post('/junior-doctor/:id/note', createJuniorNote);
// patientRouter.post('/patient', createPatient); DONE
// patientRouter.get('/patients', getPatients); DONE
// patientRouter.put('/patient/:id', updatePatient); DONE
// patientRouter.delete('/patient/:id', deletePatient); DONE
// patientRouter.get('/patient/:id/last-checkup', getLastCheckup); DONE
// patientRouter.post('/patient/appointment/:id', createAppointment); DONE


async function register(user:TypeDoctor | TypePatient| TypeJuniorDoctor, type:string):Promise<TResponseUser> {
  let path
  if(type == 'doctor') {
    path = '/doctor'
  } else if(type == 'patient') {
    path = '/patient'
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor'
  }
  return axios.post(PORT+path, {
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then((res:AxiosResponse<TResponseUser>) => {
    return res.data
  })
}

// async function login(user:TypeDoctor | TypePatient| TypeJuniorDoctor, type:string):Promise<TypeDoctor | TypePatient| TypeJuniorDoctor> {
//   let path
//   if(type == 'doctor') {
//     path = '/doctor'
//   } else if(type == 'patient') {
//     path = '/patient'
//   } else if (type == 'junior-doctor') {
//     path = '/junior-doctor'
//   }
//   return axios.post(PORT+path, {
//     body: JSON.stringify(user),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//     credentials: "include"
//   }).then((res:AxiosResponse<TypeDoctor | TypePatient| TypeJuniorDoctor>) => {
//     return res.data
//   })
// }

async function fetchData(path:string) {
  return axios.get(PORT+path, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res:AxiosResponse<TypeResponseDoctor | TypeResponsePatient>) => {
    return res.data
  })
}

async function getAllDoctors(user:TypeDoctor):Promise<TypeResponseDoctor | TypeResponsePatient> {
  return fetchData('/doctors')
}

async function getMedicalInfo(patientId:string, medicalInfo:TypeMedicalInfo):Promise<TypeResponseMedicalInfo> {
  return axios.put(`${PORT}/doctor/medical-info/${patientId}`,{
    body: JSON.stringify(medicalInfo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then((res:AxiosResponse<TypeResponseMedicalInfo>) => {
    return res.data
  })
}

async function createPatientSummary (patientId:string, summary:TypeSummary):Promise<TypeResponseSummary> {
  return axios.put(`${PORT}/doctor/summary/${patientId}`,{
    body: JSON.stringify(summary),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then((res:AxiosResponse<TypeResponseSummary>) => {
    return res.data
  })
}

// patientRouter.get('/patient/:id', getPatient);


async function putData(path:string, content:TypePatient| TypeMedicalInfo) {
  return axios.put(PORT+path,{
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then((res:AxiosResponse<TPatient>) => {
    return res.data
  })
}

async function getAllPatients(user:TypeDoctor):Promise<TypeResponseDoctor | TypeResponsePatient> {
  return fetchData('/patients')
}


async function editPatientDetails(patientId:string, patientDetails:TypePatient):Promise<TPatient> {
  return putData(`/patient/${patientId}`, patientDetails)
}

async function deletePatient(patientId:string) :Promise<TypeResponsePatient> {
  return axios.get(`${PORT}/patient/${patientId}`,{
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  }).then((res:AxiosResponse<TypeResponsePatient>) => {
    return res.data
  })
}

async function getLastCheckup (patientId:string):Promise<TypeResponseLastCheckup> {
  return axios.delete(`${PORT}/patient/${patientId}`,{
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  }).then((res:AxiosResponse<TypeResponseLastCheckup>) => {
    return res.data
  })
}

async function createAppointment (patientId:string, appointment:TypeAppointment):Promise<TypeResponseAppointment>{
  return axios.post(`${PORT}/patient/appointment/${patientId}`, {
    body: JSON.stringify(appointment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then((res:AxiosResponse<TypeResponseAppointment>) => {
    return res.data
  })
}

export {
  register,
  getAllDoctors,
  getAllPatients,
  getMedicalInfo,
  createPatientSummary
}