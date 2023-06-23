import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Doctor } from './Doctor'
import type { Patient } from './Patient'

type AppointmentAssociations = 'doctorAppointment' | 'patientAppointment'

export class Appointment extends Model<
  InferAttributes<Appointment, {omit: AppointmentAssociations}>,
  InferCreationAttributes<Appointment, {omit: AppointmentAssociations}>
> {
  declare id: CreationOptional<number>
  declare date: string | null
  declare time: Date | null
  declare attended: boolean | null
  declare illness: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Appointment belongsTo Doctor (as DoctorAppointment)
  declare doctorAppointment?: NonAttribute<Doctor>
  declare getDoctorAppointment: BelongsToGetAssociationMixin<Doctor>
  declare setDoctorAppointment: BelongsToSetAssociationMixin<Doctor, number>
  declare createDoctorAppointment: BelongsToCreateAssociationMixin<Doctor>
  
  // Appointment belongsTo Patient (as PatientAppointment)
  declare patientAppointment?: NonAttribute<Patient>
  declare getPatientAppointment: BelongsToGetAssociationMixin<Patient>
  declare setPatientAppointment: BelongsToSetAssociationMixin<Patient, number>
  declare createPatientAppointment: BelongsToCreateAssociationMixin<Patient>
  
  declare static associations: {
    doctorAppointment: Association<Appointment, Doctor>,
    patientAppointment: Association<Appointment, Patient>
  }

  static initModel(sequelize: Sequelize): typeof Appointment {
    Appointment.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY
      },
      time: {
        type: DataTypes.DATE
      },
      attended: {
        type: DataTypes.BOOLEAN
      },
      illness: {
        type: DataTypes.STRING
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
    
    return Appointment
  }
}