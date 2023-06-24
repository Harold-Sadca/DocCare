
export interface JsonMap {[member: string]: string | number | boolean | null | JsonArray | JsonMap }

export interface JsonArray extends Array<string | number | boolean | null | JsonArray | JsonMap> {}

export type Json = JsonMap | JsonArray | string | number | boolean | null

export interface TypeDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  specialisation:'General Practice' | 'Internal Medicine' | 'Pediatrics' | 'Obstetrics and Gynecology' | 'Surgery' | 'Psychiatry' | 'Dermatology' | 'Ophthalmology' | 'Ear' | 'Nose' | 'and Throat (ENT)' | 'Cardiology' | 'Endocrinology' | 'Gastroenterology' | 'Neurology' | 'Oncology' | null
  phoneNumber:number;
  address:string;
  licenseNumber:string;
  gender:'Male' | 'Female' | null
  about:string;
  availability:Json
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeAppointment {
  id?: string;
  date: Date
  attended: boolean;
  illness:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeCondition {
  id?: string;
  allergies:string;
  bloodType:string;
  medications:string;
  surgicalHistory:string;
  familyMedicalHistory:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeJuniorDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber:number;
  address:string;
  licenseNumber:string;
  gender:'Male' | 'Female' | null
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMedicalInfo {
  id?: string;
  prescription: string;
  doctorsNotes:string;
  juniorNotes:string;
  doctorId:string;
  juniorId:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMessage {
  id?:string;
  content:string;
  date:Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypePatient {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber:number;
  address:string;
  dateOfBirth:Date;
  gender:'Male' | 'Female' | null
  createdAt?: Date;
  updatedAt?: Date;
}
