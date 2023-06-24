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
  Sequelize,
} from 'sequelize';
import type { Doctor } from './Doctor';
import type { Patient } from './Patient';

type AppointmentAssociations = 'doctorAppointment' | 'patientAppointment';

export class Appointment extends Model<
  InferAttributes<Appointment, { omit: AppointmentAssociations }>,
  InferCreationAttributes<Appointment, { omit: AppointmentAssociations }>
> {
  declare id: CreationOptional<string>;
  declare date: string;
  declare time: string;
  declare attended: boolean;
  declare illness:
    | 'Common illnesses, minor injuries, preventive care, general health issues'
    | 'Chronic diseases, infections, autoimmune disorders, organ diseases'
    | 'Childhood illnesses, growth and development issues, vaccinations, pediatric infections'
    | 'Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications'
    | 'Surgical conditions, injuries requiring surgical intervention, post-operative care'
    | 'Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia'
    | 'Skin conditions, dermatitis, acne, psoriasis, skin cancer'
    | 'Eye diseases, vision problems, cataracts, glaucoma, macular degeneration'
    | 'Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders'
    | 'Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease'
    | 'Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders'
    | `Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`
    | 'Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis'
    | 'Cancer, various types and stages, chemotherapy, radiation therapy, palliative care';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Appointment belongsTo Doctor (as DoctorAppointment)
  declare doctorAppointment?: NonAttribute<Doctor>;
  declare getDoctorAppointment: BelongsToGetAssociationMixin<Doctor>;
  declare setDoctorAppointment: BelongsToSetAssociationMixin<Doctor, string>;
  declare createDoctorAppointment: BelongsToCreateAssociationMixin<Doctor>;

  // Appointment belongsTo Patient (as PatientAppointment)
  declare patientAppointment?: NonAttribute<Patient>;
  declare getPatientAppointment: BelongsToGetAssociationMixin<Patient>;
  declare setPatientAppointment: BelongsToSetAssociationMixin<Patient, string>;
  declare createPatientAppointment: BelongsToCreateAssociationMixin<Patient>;

  declare static associations: {
    doctorAppointment: Association<Appointment, Doctor>;
    patientAppointment: Association<Appointment, Patient>;
  };

  static initModel(sequelize: Sequelize): typeof Appointment {
    Appointment.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATEONLY,
        },
        time: {
          type: DataTypes.TIME,
        },
        attended: {
          type: DataTypes.BOOLEAN,
        },
        illness: {
          type: DataTypes.ENUM(
            'Common illnesses, minor injuries, preventive care, general health issues',
            'Chronic diseases, infections, autoimmune disorders, organ diseases',
            'Childhood illnesses, growth and development issues, vaccinations, pediatric infections',
            'Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications',
            'Surgical conditions, injuries requiring surgical intervention, post-operative care',
            'Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia',
            'Skin conditions, dermatitis, acne, psoriasis, skin cancer',
            'Eye diseases, vision problems, cataracts, glaucoma, macular degeneration',
            'Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders',
            'Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease',
            'Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders',
            `Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`,
            'Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis',
            'Cancer, various types and stages, chemotherapy, radiation therapy, palliative care'
          ),
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

    return Appointment;
  }
}
