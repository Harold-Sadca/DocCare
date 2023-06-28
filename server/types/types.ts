export type TypeAvailability = { [day: number]: number[] };

export interface TypeDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  specialisation:
    | 'General Practice'
    | 'Internal Medicine'
    | 'Pediatrics'
    | 'Obstetrics and Gynecology'
    | 'Surgery'
    | 'Psychiatry'
    | 'Dermatology'
    | 'Ophthalmology'
    | 'Ear Nose and Throat (ENT)'
    | 'Cardiology'
    | 'Endocrinology'
    | 'Gastroenterology'
    | 'Neurology'
    | 'Oncology';
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  gender: 'Male' | 'Female';
  about: string;
  availability?: TypeAvailability;
  doctorAppointments?: TypeAppointment[];
  patients?: TypePatient[];
  userType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeAppointment {
  id?: string;
  date: string;
  time: string;
  attended: boolean;
  illness:
    | 'Common illnesses, minor injuries, preventive care, general health issues'
    | 'Chronic diseases, infections, autoimmune disorders, organ diseases'
    | 'Childhood illnesses, growth and development issues, vaccinations, pediatric infections'
    | 'Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications'
    | 'Surgical conditions, injuries requiring surgical intervention, post-operative care'
    | 'Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia'
    | 'Skin conditions, dermatitis, acne, psoriasis, skin cancer'
    | 'Eye diseases, vision problems, cataracts, glaucoma, macular degeneration'
    | 'Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders'
    | 'Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease'
    | 'Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders'
    | `Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`
    | 'Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis'
    | 'Cancer, various types and stages, chemotherapy, radiation therapy, palliative care';
  doctor_id?: string;
  patient_id?: string;
  patientAppointment?: TypePatient;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeJuniorDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  gender: 'Male' | 'Female';
  userType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMedicalInfo {
  id?: string;
  prescription: string;
  doctorNote: string;
  doctorName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMessage {
  id?: string;
  content: string;
  sender_id: string;
  sender_name: string;
  receiver_id: string;
  receiver_name: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypePatient {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  juniorNotes?: string;
  summary?: string;
  allergies: string;
  bloodType: string;
  medications: string;
  surgicalHistory: string;
  familyMedicalHistory: string;
  patientAppointments?: TypeAppointment[];
  userType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeChatUser {
  userID:string
  name:string
  messages:[]
}