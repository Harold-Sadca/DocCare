import {
  TypeDoctor,
  TypePatient,
  TypeJuniorDoctor,
  TypeMedicalInfo,
  TypeAppointment,
} from '../../server/types/types';

export interface TypeLogin {
  email: string;
  password: string;
}

export interface TypeResponse {
  message: string;
  error?: string;
}

export interface TypeResponseDoctor extends TypeResponse {
  result: {
    accessToken: string;
    user: TypeDoctor;
  };
}

export interface TypeResponseJuniorDoctor extends TypeResponse {
  result: {
    accessToken: string;
    user: TypeJuniorDoctor;
  };
}

export interface TypeResponsePatient extends TypeResponse {
  result: {
    accessToken: string;
    user: TypePatient;
  };
}

export interface TypeResponseMedicalInfo extends TypeResponse {
  result?: TypeMedicalInfo;
}

export interface TypeResponseSummary extends TypeResponse {
  result?: TypeSummary;
}

export interface TypeSummary {
  newPatientSummary: string;
  patientId: string;
}

export interface TypeResponseLastCheckup {
  doctorNote: string;
  lastDate: TypeAppointment;
}

export interface TypeResponseAppointment extends TypeResponse {
  result?: TypeAppointment;
}

export interface TypeResponseJuniorNotes extends TypeResponse {
  result?: TypePatient;
}

export type TPatient =
  | TypeResponseSummary
  | TypeResponsePatient
  | TypeResponseMedicalInfo;

// export type TUser = TypeDoctor | TypePatient | TypeJuniorDoctor;
export type TUser = Partial<
  Extract<TypeDoctor | TypePatient | TypeJuniorDoctor, {}>
>;

export type TResponseUser = Partial<
  Extract<
    TypeResponseDoctor | TypeResponseJuniorDoctor | TypeResponsePatient,
    {}
  >
>;

export type TRMedicalSummary = TypeMedicalInfo | TypeSummary;
