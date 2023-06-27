import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

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
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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
      sequelize
    })
    
    return Message
  }
}