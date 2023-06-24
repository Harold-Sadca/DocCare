const { Sequelize } = require('sequelize')
const { initModels } = require('../models/schema/associations');
const {  specialisations,
  doctorNames,
  doctorLicenseNumbers,
  addresses,
  phoneNumbers,
  emails,
  passwords,
  doctorEmails} = require('./doctorHelper')
const {
  patientNames,
  patientEmails,
} = require('./patientHelper')
const {
  randomJuniorDoctorNames,
  juniorDoctorEmails
} = require('./juniorDoctorHelpers')
const dotenv = require('dotenv')
dotenv.config();

const dbName = 'DocCare';

const db = new Sequelize(
  dbName,
  'username',
  `${process.env.MYSQL_PASSWORD}`,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'mysql',
  }
);

const { Message, Appointment, Condition, Doctor, JuniorDoctor, MedicalInfo, Patient } = initModels(db);

(async function authenticate() {
  try {
    await db.sync({force:true});
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const genders = ['Male', 'Female']
function createEmptyAvailability() {
  const availability = {};
  for (let day = 1; day <= 31; day++) {
    availability[day] = [];
  }
  return availability;
}

const seedDB = async () => {
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * 10);
      const spec = Math.floor(Math.random() * specialisations.length);
      const gen = Math.floor(Math.random()*2)
      const doctor = new Doctor({
        name: doctorNames[num],
        email: doctorEmails[num],
        password: passwords[num],
        specialisation:specialisations[spec],
        phoneNumber: phoneNumbers[num],
        address: doctorNames[num],
        licenseNumber: doctorLicenseNumbers[num],
        gender: genders[gen],
        about: string,
        availability: createEmptyAvailability(),
      })
      await doctor.save();
    }
}

seedDB().then(() => {
  db.close();
})



export default { db, Message, Appointment, Condition, Doctor, JuniorDoctor, MedicalInfo, Patient };