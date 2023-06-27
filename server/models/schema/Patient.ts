import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize';
import type { Appointment } from './Appointment';
import type { MedicalInfo } from './MedicalInfo';
import type { Message } from './Message';
type PatientAssociations =
  | 'patientSentMessages'
  | 'patientAppointments'
  | 'medicalInfo'
  | 'patientReceivedMessage';

export class Patient extends Model<
  InferAttributes<Patient, { omit: PatientAssociations }>,
  InferCreationAttributes<Patient, { omit: PatientAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare email: string | null;
  declare password: string | null;
  declare phoneNumber: string | null;
  declare address: string | null;
  declare dateOfBirth: string | null;
  declare gender: 'Male' | 'Female' | null;
  declare juniorNotes: string | null;
  declare summary: string | null;
  declare conditions: {
    allergies: string | null;
    bloodType: string | null;
    medications: string | null;
    surgicalHistory: string | null;
    familyMedicalHistory: string | null;
  } | null;
  declare userType: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Patient hasMany Message (as PatientSentMessages)
  declare patientSentMessages?: NonAttribute<Message[]>
  declare getPatientSentMessages: HasManyGetAssociationsMixin<Message>
  declare setPatientSentMessages: HasManySetAssociationsMixin<Message, number>
  declare addPatientSentMessage: HasManyAddAssociationMixin<Message, number>
  declare addPatientSentMessages: HasManyAddAssociationsMixin<Message, number>
  declare createPatientSentMessage: HasManyCreateAssociationMixin<Message>
  declare removePatientSentMessage: HasManyRemoveAssociationMixin<Message, number>
  declare removePatientSentMessages: HasManyRemoveAssociationsMixin<Message, number>
  declare hasPatientSentMessage: HasManyHasAssociationMixin<Message, number>
  declare hasPatientSentMessages: HasManyHasAssociationsMixin<Message, number>
  declare countPatientSentMessages: HasManyCountAssociationsMixin
  // Patient hasMany Appointment (as PatientAppointment)
  declare patientAppointments?: NonAttribute<Appointment[]>;
  declare getPatientAppointments: HasManyGetAssociationsMixin<Appointment>;
  declare setPatientAppointments: HasManySetAssociationsMixin<
    Appointment,
    number
  >;
  declare addPatientAppointment: HasManyAddAssociationMixin<
    Appointment,
    number
  >;
  declare addPatientAppointments: HasManyAddAssociationsMixin<
    Appointment,
    number
  >;
  declare createPatientAppointment: HasManyCreateAssociationMixin<Appointment>;
  declare removePatientAppointment: HasManyRemoveAssociationMixin<
    Appointment,
    number
  >;
  declare removePatientAppointments: HasManyRemoveAssociationsMixin<
    Appointment,
    number
  >;
  declare hasPatientAppointment: HasManyHasAssociationMixin<
    Appointment,
    number
  >;
  declare hasPatientAppointments: HasManyHasAssociationsMixin<
    Appointment,
    number
  >;
  declare countPatientAppointments: HasManyCountAssociationsMixin;
  // Patient hasOne MedicalInfo (as MedicalInfo)
  declare medicalInfo?: NonAttribute<MedicalInfo>;
  declare getMedicalInfo: HasOneGetAssociationMixin<MedicalInfo>;
  declare setMedicalInfo: HasOneSetAssociationMixin<MedicalInfo, number>;
  declare createMedicalInfo: HasOneCreateAssociationMixin<MedicalInfo>;
  // Patient belongsTo Message (as PatientReceivedMessages)
  declare patientReceivedMessage?: NonAttribute<Message>
  declare getPatientReceivedMessage: BelongsToGetAssociationMixin<Message>
  declare setPatientReceivedMessage: BelongsToSetAssociationMixin<Message, number>
  declare createPatientReceivedMessage: BelongsToCreateAssociationMixin<Message>
  declare static associations: {
    patientMessages: Association<Patient, Message>;
    patientAppointments: Association<Patient, Appointment>;
    medicalInfo: Association<Patient, MedicalInfo>;
    patientReceivedMessage: Association<Patient, Message>
  };
  static initModel(sequelize: Sequelize): typeof Patient {
    Patient.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        dateOfBirth: {
          type: DataTypes.DATEONLY,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female'),
        },
        juniorNotes: {
          type: DataTypes.STRING,
        },
        summary: {
          type: DataTypes.STRING,
        },
        conditions: {
          type: DataTypes.JSON,
        },
        userType: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );
    return Patient;
  }
}
