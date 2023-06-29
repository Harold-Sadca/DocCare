'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import './appointment-dashboard.css';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;
import { useRouter } from 'next/navigation';
import apiService from '@/services/APIservices';
import { TypeDoctor } from '@/../server/types/types';
import Link from 'next/link';
import { TypeAvailableSpecialist } from '@/types/types';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setAvailableSpecialist } from '@/redux/features/available-doctors-slice';

const initialState = {
  date: '',
  illnesses: '',
};

// choose the date (no time)
// choose the illness
// submit -> (filter doctos and map) show list of doctors (name, picture, about and availability + button) based on the illness
// choose the doctor and the time
// submit ->
// pass the day and the time slot
// backend: go to the doctor, availability and
// availability.day.push(time slot)
// return doctor
// success message and redirect to /patient

// rule: dont allow choose weekends

export default function PatientAppointment() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [openForm, setOpenForm] = useState(true);
  const [state, setState] = useState(initialState);
  const [specialists, setSpecialists] = useState<TypeDoctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<TypeDoctor[]>([]);
  const [availableSpecialists, setAvailableSpecialists] = useState<
    TypeAvailableSpecialist[]
  >([]);

  const handleNextButtonClick = () => {
    setOpenForm(false);
  };

  type SizeType = Parameters<typeof Form>[0]['size'];
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  }

  function formatStateDate(date: string) {
    // 2023-07-01
    const [year, month, day] = date.split('-');
    const formattedMonth = month.startsWith('0') ? month.substring(1) : month;
    const formattedDay = day.startsWith('0') ? day.substring(1) : day;
    console.log(year);
    console.log([year, formattedMonth, formattedDay]);
    return [Number(year), Number(formattedMonth), Number(formattedDay)];
  }

  // formatStateDate(state.date);

  console.log(state);

  async function getAllTheDoctors() {
    const token = localStorage.getItem('accessToken') as string;
    const allTheDoctors = await apiService
      .getAllDoctors(token)
      .then((doctors) => {
        console.log(doctors);
        setAllDoctors(doctors);
      });
  }

  useEffect(() => {
    getAllTheDoctors();
  }, []);

  function getSpecialists() {
    return allDoctors.filter((docs) => {
      return docs.specialisation === state.illnesses && docs;
    });
  }

  function displayAvailability(
    stateDate: string,
    formatedDate: number[],
    stateIllness: string
  ) {
    const [stateYear, stateMonth, stateDay] = formatedDate;
    return specialists.map((docs) => {
      console.log(docs.availability && docs.availability[stateMonth][stateDay]);
      return (
        docs.availability && {
          doctorName: docs.name,
          doctorId: docs.id,
          doctorAbout: docs.about,
          doctorProfilePic: docs.profilePicture,
          slots: docs.availability[stateMonth][stateDay],
          date: stateDate,
          illness: stateIllness,
        }
      );
    });
  }

  useEffect(() => {
    setSpecialists(getSpecialists());
    // if (state.date && state.illnesses) {
    //   const availableDoctors = displayAvailability(
    //     state.date,
    //     formatStateDate(state.date),
    //     state.illnesses
    //   ) as TypeAvailableSpecialist[];
    //   dispatch(setAvailableSpecialist(availableDoctors));
    //   setAvailableSpecialists(availableDoctors);
    // }
  }, [state]);

  // console.log(specialists);
  // console.log(allDoctors);
  console.log({ availableSpecialists });

  function submitForm() {
    // e.preventDefault();
    // (filter doctos and map) show list of doctors (name, picture, about and availability + button) based on the illness
    if (state.date && state.illnesses) {
      const availableDoctors = displayAvailability(
        state.date,
        formatStateDate(state.date),
        state.illnesses
      ) as TypeAvailableSpecialist[];
      dispatch(setAvailableSpecialist(availableDoctors));
      setAvailableSpecialists(availableDoctors);
    }
    router.push('/patient/appointment/available-doctors');
  }

  return (
    <main className='patient-appointment-main'>
      <AuthNavbar user={'patient'} auth={'login'} />
      {openForm ? (
        <>
          <div className='lay'>
            <h1 className='appointment-heading'>Make an Appointment</h1>
            <div className='steps'>
              <div className='Consultation-1'>
                <img src='/1.png' className='icon' />
                <div>
                  <h2>Request Consultation</h2>
                  <p>Describe your Illness and choose the Date</p>
                </div>
              </div>
              <div className='Doctor-2'>
                <img src='/2.png' className='icon' />
                <div>
                  <h2>Find a Doctor</h2>
                  <p>
                    Find a Doctor Related to the disease you are suffering from
                    to get the best consultation.
                  </p>
                </div>
              </div>
              <div className='Solution-3'>
                <img src='/3.png' className='icon' />
                <div>
                  <h2>Get a Solution</h2>
                  <p>
                    Our Doctor will give you a solution regarding the illness
                    you're suffering from.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleNextButtonClick}
                className='button-make-appointment'
              >
                Make the Appointment
              </button>
            </div>
            <div className='female-doctor'>
              <img src='/Female-Doctor-PNG-Image.png' />
            </div>
          </div>
        </>
      ) : (
        <div className='form-appointment'>
          <div>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 900 }}
              action='/'
              method='post'
              onFinish={submitForm}
            >
              <div className='appointment-date'>
                <h3>Appointment Date</h3>
                <Form.Item htmlFor='appointment'>
                  <Input
                    type='date'
                    id='date'
                    name='date'
                    value={state.date}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Item>
              </div>
              <h3>What kind of Illness are you experiencing?</h3>
              <Form.Item htmlFor='illness'>
                <Radio.Group id='illness' name='illnesses'>
                  <Radio
                    id='illness1'
                    value='General Practice'
                    onChange={(value) => handleChange(value)}
                  >
                    Common illnesses, minor injuries, preventive care, general
                    health issues{' '}
                  </Radio>
                  <Radio
                    id='illness2'
                    value='Internal Medicine'
                    onChange={(value) => handleChange(value)}
                  >
                    Chronic diseases, infections, autoimmune disorders, organ
                    diseases{' '}
                  </Radio>
                  <Radio
                    id='illness3'
                    value='Pediatrics'
                    onChange={(value) => handleChange(value)}
                  >
                    Childhood illnesses, growth and development issues,
                    vaccinations, pediatric infections.{' '}
                  </Radio>
                  <Radio
                    id='illness4'
                    value='Obstetrics and Gynecology'
                    onChange={(value) => handleChange(value)}
                  >
                    Pregnancy-related conditions, gynecological disorders,
                    fertility issues, childbirth complications{' '}
                  </Radio>
                  <Radio
                    id='illness5'
                    value='Surgery'
                    onChange={(value) => handleChange(value)}
                  >
                    Surgical conditions, injuries requiring surgical
                    intervention, post-operative care{' '}
                  </Radio>
                  <Radio
                    id='illness6'
                    value='Psychiatry'
                    onChange={(value) => handleChange(value)}
                  >
                    Mental health disorders, anxiety, depression, bipolar
                    disorder, schizophrenia{' '}
                  </Radio>
                  <Radio
                    id='illness7'
                    value='Dermatology'
                    onChange={(value) => handleChange(value)}
                  >
                    Skin conditions, dermatitis, acne, psoriasis, skin cancer{' '}
                  </Radio>
                  <Radio
                    id='illness8'
                    value='Ophthalmology'
                    onChange={(value) => handleChange(value)}
                  >
                    Eye diseases, vision problems, cataracts, glaucoma, macular
                    degeneration
                  </Radio>
                  <Radio
                    id='illness9'
                    value='Ear Nose and Throat (ENT)'
                    onChange={(value) => handleChange(value)}
                  >
                    Ear infections, sinusitis, tonsillitis, hearing loss, vocal
                    cord disorders{' '}
                  </Radio>
                  <Radio
                    id='illness10'
                    value='Cardiology'
                    onChange={(value) => handleChange(value)}
                  >
                    Heart diseases, hypertension, heart failure, arrhythmias,
                    coronary artery disease{' '}
                  </Radio>
                  <Radio
                    id='illness11'
                    value='Endocrinology'
                    onChange={(value) => handleChange(value)}
                  >
                    Diabetes, thyroid disorders, hormonal imbalances, metabolic
                    disorders
                  </Radio>
                  <Radio
                    id='illness12'
                    value='Gastroenterology'
                    onChange={(value) => handleChange(value)}
                  >
                    Digestive system disorders, gastrointestinal cancers,
                    irritable bowel syndrome, Crohn's disease{' '}
                  </Radio>
                  <Radio
                    id='illness13'
                    value='Neurology'
                    onChange={(value) => handleChange(value)}
                  >
                    Neurological disorders, migraines, epilepsy, stroke,
                    multiple sclerosis{' '}
                  </Radio>
                  <Radio
                    id='illness14'
                    value='Oncology'
                    onChange={(value) => handleChange(value)}
                  >
                    Cancer, various types and stages, chemotherapy, radiation
                    therapy, palliative care{' '}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* <Link
                className='next-button'
                href='/patient/appointment/available-doctors'
              >
                Next
              </Link> */}
              <button
                className='next-button'
                // onClick={() =>
                //   router.push('/patient/appointment/available-doctors', {
                //     query: { availableSpecialists },
                //   })
                // }
                type='submit'
              >
                Next
              </button>
            </Form>
          </div>
        </div>
      )}
    </main>
  );
}
