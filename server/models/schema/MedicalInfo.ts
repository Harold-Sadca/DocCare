import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
export class MedicalInfo extends Model<
  InferAttributes<MedicalInfo>,
  InferCreationAttributes<MedicalInfo>
> {
  declare id?: CreationOptional<string>;
  declare prescription: string | null;
  declare doctorNote: string | null;
  declare doctorName: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof MedicalInfo {
    MedicalInfo.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        prescription: {
          type: DataTypes.STRING,
        },
        doctorNote: {
          type: DataTypes.STRING,
        },
        doctorName: {
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
        hooks:{
          beforeValidate: (info) => {
            info.id = uuidv4()
          }
        },
        sequelize,
      }
    );
    return MedicalInfo;
  }
}