import {TypeDoctor, TypePatient, TypeJuniorDoctor, TypeMedicalInfo, TypeAppointment} from '../../server/types/types'

export interface TypeLogin {
  email:string;
  password:string;
}

export interface TypeResponseDoctor {
  message?:string;
  result?:TypeDoctor;
  error?:string;
}
export interface TypeResponseJuniorDoctor {
  message?:string;
  result?:TypeJuniorDoctor;
  error?:string;
}
export interface TypeResponsePatient {
  message?:string;
  result?:TypePatient;
  error?:string;
}

export interface TypeResponseMedicalInfo {
  message?:string;
  result?:TypeMedicalInfo;
  error?:string;
}

export interface TypeResponseSummary {
  message?:string;
  result?: TypeSummary;
  error?:string;
}

export interface TypeSummary {
  newPatientSummary: string;
  patientId: string;
}

export interface TypeResponseLastCheckup {
  doctorNote:string;
  lastDate: TypeAppointment
}

export interface TypeResponseAppointment {
  message?:string;
  result?: TypeAppointment;
  error?:string;
}

export interface TypeResponseJuniorNotes {
  message?:string;
  result?: TypePatient;
  error?:string;
}


export type TPatient = TypeResponseSummary | TypeResponsePatient | TypeResponseMedicalInfo;

export type TUser = TypeDoctor | TypePatient | TypeJuniorDoctor

export type TResponseUser = TypeResponseDoctor | TypeResponseJuniorDoctor| TypeResponsePatient

