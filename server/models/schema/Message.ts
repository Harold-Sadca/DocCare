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
import type { JuniorDoctor } from './JuniorDoctor'
import type { Patient } from './Patient'

type MessageAssociations = 'juniorSent' | 'juniorReceived' | 'patientSent' | 'patientReceived'

export class Message extends Model<
  InferAttributes<Message, {omit: MessageAssociations}>,
  InferCreationAttributes<Message, {omit: MessageAssociations}>
> {
  declare id: CreationOptional<string>
  declare content: string | null
  declare date: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Message belongsTo JuniorDoctor (as JuniorSent)
  declare juniorSent?: NonAttribute<JuniorDoctor>
  declare getJuniorSent: BelongsToGetAssociationMixin<JuniorDoctor>
  declare setJuniorSent: BelongsToSetAssociationMixin<JuniorDoctor, number>
  declare createJuniorSent: BelongsToCreateAssociationMixin<JuniorDoctor>
  
  // Message belongsTo JuniorDoctor (as JuniorReceived)
  declare juniorReceived?: NonAttribute<JuniorDoctor>
  declare getJuniorReceived: BelongsToGetAssociationMixin<JuniorDoctor>
  declare setJuniorReceived: BelongsToSetAssociationMixin<JuniorDoctor, number>
  declare createJuniorReceived: BelongsToCreateAssociationMixin<JuniorDoctor>
  
  // Message belongsTo Patient (as PatientSent)
  declare patientSent?: NonAttribute<Patient>
  declare getPatientSent: BelongsToGetAssociationMixin<Patient>
  declare setPatientSent: BelongsToSetAssociationMixin<Patient, number>
  declare createPatientSent: BelongsToCreateAssociationMixin<Patient>
  
  // Message belongsTo Patient (as PatientReceived)
  declare patientReceived?: NonAttribute<Patient>
  declare getPatientReceived: BelongsToGetAssociationMixin<Patient>
  declare setPatientReceived: BelongsToSetAssociationMixin<Patient, number>
  declare createPatientReceived: BelongsToCreateAssociationMixin<Patient>
  
  declare static associations: {
    juniorSent: Association<Message, JuniorDoctor>,
    juniorReceived: Association<Message, JuniorDoctor>,
    patientSent: Association<Message, Patient>,
    patientReceived: Association<Message, Patient>
  }

  static initModel(sequelize: Sequelize): typeof Message {
    Message.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
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
    
    return Message
  }
}