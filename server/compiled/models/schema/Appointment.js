"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class Appointment extends sequelize_1.Model {
    static initModel(sequelize) {
        Appointment.init({
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
            },
            time: {
                type: sequelize_1.DataTypes.TIME,
            },
            attended: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
            illness: {
                type: sequelize_1.DataTypes.ENUM('Common illnesses, minor injuries, preventive care, general health issues', 'Chronic diseases, infections, autoimmune disorders, organ diseases', 'Childhood illnesses, growth and development issues, vaccinations, pediatric infections', 'Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications', 'Surgical conditions, injuries requiring surgical intervention, post-operative care', 'Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia', 'Skin conditions, dermatitis, acne, psoriasis, skin cancer', 'Eye diseases, vision problems, cataracts, glaucoma, macular degeneration', 'Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders', 'Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease', 'Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders', `Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`, 'Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis', 'Cancer, various types and stages, chemotherapy, radiation therapy, palliative care'),
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            hooks: {
                beforeValidate: (appointment) => {
                    appointment.id = (0, uuid_1.v4)();
                }
            },
            sequelize,
        });
        return Appointment;
    }
}
exports.Appointment = Appointment;
