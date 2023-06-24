import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

export class Condition extends Model<
  InferAttributes<Condition>,
  InferCreationAttributes<Condition>
> {
  declare id: CreationOptional<string>
  declare allergies: string | null
  declare bloodType: string | null
  declare medications: string | null
  declare surgicalHistory: string | null
  declare familyMedicalHistory: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof Condition {
    Condition.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      allergies: {
        type: DataTypes.STRING
      },
      bloodType: {
        type: DataTypes.STRING
      },
      medications: {
        type: DataTypes.STRING
      },
      surgicalHistory: {
        type: DataTypes.STRING
      },
      familyMedicalHistory: {
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
    
    return Condition
  }
}