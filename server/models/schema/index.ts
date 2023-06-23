import { Sequelize } from 'sequelize';
import { initModels } from './associations';
import dotenv from 'dotenv';
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
    await db.sync();
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default { db, Message, Appointment, Condition, Doctor, JuniorDoctor, MedicalInfo, Patient };