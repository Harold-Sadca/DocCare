import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<string>
  declare content: string | null
  declare sender_id: string | null
  declare sender_name: string | null
  declare receiver_id: string | null
  declare receiver_name: string | null
  declare date: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof Message {
    Message.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING
      },
      sender_id: {
        type: DataTypes.STRING
      },
      sender_name: {
        type: DataTypes.STRING
      },
      receiver_id: {
        type: DataTypes.STRING
      },
      receiver_name: {
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
      hooks:{
        beforeValidate: (message) => {
          message.id = uuidv4()
        }
      },
      sequelize
    })
    
    return Message
  }
}