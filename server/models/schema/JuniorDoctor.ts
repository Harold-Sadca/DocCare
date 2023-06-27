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
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import type { Message } from './Message';
type JuniorDoctorAssociations = 'juniorSentMessages' | 'juniorReceivedMessages'
export class JuniorDoctor extends Model<
  InferAttributes<JuniorDoctor, { omit: JuniorDoctorAssociations }>,
  InferCreationAttributes<JuniorDoctor, { omit: JuniorDoctorAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare email: string | null;
  declare password: string | null;
  declare licenseNumber: string | null;
  declare phoneNumber: string | null;
  declare address: string | null;
  declare gender: 'Male' | 'Female' | null;
  declare userType: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  // JuniorDoctor hasMany Message (as JuniorSentMessages)
  declare juniorSentMessages?: NonAttribute<Message[]>
  declare getJuniorSentMessages: HasManyGetAssociationsMixin<Message>
  declare setJuniorSentMessages: HasManySetAssociationsMixin<Message, number>
  declare addJuniorSentMessage: HasManyAddAssociationMixin<Message, number>
  declare addJuniorSentMessages: HasManyAddAssociationsMixin<Message, number>
  declare createJuniorSentMessage: HasManyCreateAssociationMixin<Message>
  declare removeJuniorSentMessage: HasManyRemoveAssociationMixin<Message, number>
  declare removeJuniorSentMessages: HasManyRemoveAssociationsMixin<Message, number>
  declare hasJuniorSentMessage: HasManyHasAssociationMixin<Message, number>
  declare hasJuniorSentMessages: HasManyHasAssociationsMixin<Message, number>
  declare countJuniorSentMessages: HasManyCountAssociationsMixin
  
  // JuniorDoctor hasMany Message (as JuniorReceivedMessages)
  declare juniorReceivedMessages?: NonAttribute<Message[]>
  declare getJuniorReceivedMessages: HasManyGetAssociationsMixin<Message>
  declare setJuniorReceivedMessages: HasManySetAssociationsMixin<Message, number>
  declare addJuniorReceivedMessage: HasManyAddAssociationMixin<Message, number>
  declare addJuniorReceivedMessages: HasManyAddAssociationsMixin<Message, number>
  declare createJuniorReceivedMessage: HasManyCreateAssociationMixin<Message>
  declare removeJuniorReceivedMessage: HasManyRemoveAssociationMixin<Message, number>
  declare removeJuniorReceivedMessages: HasManyRemoveAssociationsMixin<Message, number>
  declare hasJuniorReceivedMessage: HasManyHasAssociationMixin<Message, number>
  declare hasJuniorReceivedMessages: HasManyHasAssociationsMixin<Message, number>
  declare countJuniorReceivedMessages: HasManyCountAssociationsMixin

  declare static associations: {
    juniorSentMessages: Association<JuniorDoctor, Message>,
    juniorReceivedMessages: Association<JuniorDoctor, Message>
  };
  static initModel(sequelize: Sequelize): typeof JuniorDoctor {
    JuniorDoctor.init(
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
        licenseNumber: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female'),
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
    return JuniorDoctor;
  }
}
