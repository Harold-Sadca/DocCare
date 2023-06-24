import {
  Association,
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
} from 'sequelize'
import type { Appointment } from './Appointment'
import type { Condition } from './Condition'
import type { MedicalInfo } from './MedicalInfo'
import type { Message } from './Message'

type PatientAssociations = 'condition' | 'patientMessages' | 'patientAppointments' | 'medicalInfo'
// id?: string;
// name: string;
// email: string;
// password: string;
// phoneNumber:number;
// address:string;
// dateOfBirth:Date;
// gender:string;
// createdAt?: Date;
// updatedAt?: Date;
export class Patient extends Model<
  InferAttributes<Patient, {omit: PatientAssociations}>,
  InferCreationAttributes<Patient, {omit: PatientAssociations}>
> {
  declare id: CreationOptional<string>
  declare name: string | null
  declare email: string | null
  declare password: string | null
  declare phoneNumber: number | null
  declare address: string | null
  declare dateOfBirth: Date | null
  declare gender: 'Male' | 'Female' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Patient hasOne Condition (as Condition)
  declare condition?: NonAttribute<Condition>
  declare getCondition: HasOneGetAssociationMixin<Condition>
  declare setCondition: HasOneSetAssociationMixin<Condition, number>
  declare createCondition: HasOneCreateAssociationMixin<Condition>
  
  // Patient hasMany Message (as PatientMessages)
  declare patientMessages?: NonAttribute<Message[]>
  declare getPatientMessages: HasManyGetAssociationsMixin<Message>
  declare setPatientMessages: HasManySetAssociationsMixin<Message, number>
  declare addPatientMessage: HasManyAddAssociationMixin<Message, number>
  declare addPatientMessages: HasManyAddAssociationsMixin<Message, number>
  declare createPatientMessage: HasManyCreateAssociationMixin<Message>
  declare removePatientMessage: HasManyRemoveAssociationMixin<Message, number>
  declare removePatientMessages: HasManyRemoveAssociationsMixin<Message, number>
  declare hasPatientMessage: HasManyHasAssociationMixin<Message, number>
  declare hasPatientMessages: HasManyHasAssociationsMixin<Message, number>
  declare countPatientMessages: HasManyCountAssociationsMixin
  
  // Patient hasMany Appointment (as PatientAppointment)
  declare patientAppointments?: NonAttribute<Appointment[]>
  declare getPatientAppointments: HasManyGetAssociationsMixin<Appointment>
  declare setPatientAppointments: HasManySetAssociationsMixin<Appointment, number>
  declare addPatientAppointment: HasManyAddAssociationMixin<Appointment, number>
  declare addPatientAppointments: HasManyAddAssociationsMixin<Appointment, number>
  declare createPatientAppointment: HasManyCreateAssociationMixin<Appointment>
  declare removePatientAppointment: HasManyRemoveAssociationMixin<Appointment, number>
  declare removePatientAppointments: HasManyRemoveAssociationsMixin<Appointment, number>
  declare hasPatientAppointment: HasManyHasAssociationMixin<Appointment, number>
  declare hasPatientAppointments: HasManyHasAssociationsMixin<Appointment, number>
  declare countPatientAppointments: HasManyCountAssociationsMixin
  
  // Patient hasOne MedicalInfo (as MedicalInfo)
  declare medicalInfo?: NonAttribute<MedicalInfo>
  declare getMedicalInfo: HasOneGetAssociationMixin<MedicalInfo>
  declare setMedicalInfo: HasOneSetAssociationMixin<MedicalInfo, number>
  declare createMedicalInfo: HasOneCreateAssociationMixin<MedicalInfo>
  
  declare static associations: {
    condition: Association<Patient, Condition>,
    patientMessages: Association<Patient, Message>,
    patientAppointments: Association<Patient, Appointment>,
    medicalInfo: Association<Patient, MedicalInfo>
  }

  static initModel(sequelize: Sequelize): typeof Patient {
    Patient.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female')
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Patient
  }
}