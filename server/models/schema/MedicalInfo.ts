import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize';
export class MedicalInfo extends Model<
  InferAttributes<MedicalInfo>,
  InferCreationAttributes<MedicalInfo>
> {
  declare id: CreationOptional<number>;
  declare prescription: string | null;
  declare doctorNotes: string | null;
  declare doctorId: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof MedicalInfo {
    MedicalInfo.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        prescription: {
          type: DataTypes.STRING,
        },
        doctorNotes: {
          type: DataTypes.STRING,
        },
        doctorId: {
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
    return MedicalInfo;
  }
}
