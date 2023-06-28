"use client";
import AuthNavbar from "@/app/(components)/auth-navbar";
import { Montserrat } from "next/font/google";
import "./appoitment-dashboard.css";
import { Form, Input, Radio, RadioChangeEvent, Upload } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import { useRouter } from "next/navigation";

export default function PatientAppoitment() {
  type SizeType = Parameters<typeof Form>[0]["size"];
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) => {
    // const { name, value } = e.target;
    // setState((prevState) => ({
    //   ...prevState,
    //   [name as string]: value,
    // }));
  };

  return (
    <main className="patient-appoitment-main">
      <AuthNavbar user={"patient"} auth={"login"} />
      {/* change the navbar to the correct info  */}
      <h1 className="appoitment-heading">Make an Appoitment</h1>
      <div className="lay">
        <div className="steps">
          <div className="Consultation-1">
            <img src="/1.png" className="icon" />
            <div>
              <h2>Request Consultation</h2>
              <p>Describe your Illness and choose the Date</p>
            </div>
          </div>
          <div className="Doctor-2">
            <img src="/2.png" className="icon" />
            <div>
              <h2>Find a Doctor</h2>
              <p>
                Find a Doctor Related to the disease you are suffering from to
                get the best consultation.
              </p>
            </div>
          </div>
          <div className="Solution-3">
            <img src="/3.png" className="icon" />
            <div>
              <h2>Get a Solution</h2>
              <p>
                Our Doctor will give you a solution regarding the illness you're
                suffering from.
              </p>
            </div>
          </div>
        </div>
        <div className="female-doctor">
          <img src="/Female-Doctor-PNG-Image.png" />
        </div>
        <div className="form-appoitment">
          <div>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 900 }}
              action="/"
              method="post"
              // onFinish={submitForm}
            >
              <Form.Item label="Appoitment " htmlFor="appoitment">
                <Input
                  type="date"
                  id="appoitment"
                  name="appoitment"
                  // value={state.dateOfBirth}
                  // onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Item>
              <Form.Item label="Illness" htmlFor="illness">
                <Radio.Group id="illness" name="Illnesses">
                  <Radio
                    id="illness1"
                    value="General Practice"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Common illnesses, minor injuries, preventive care, general
                    health issues{" "}
                  </Radio>
                  <Radio
                    id="illness2"
                    value="Internal Medicine"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Chronic diseases, infections, autoimmune disorders, organ
                    diseases{" "}
                  </Radio>
                  <Radio
                    id="illness3"
                    value="Pediatrics"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Childhood illnesses, growth and development issues,
                    vaccinations, pediatric infections.{" "}
                  </Radio>
                  <Radio
                    id="illness4"
                    value="Obstetrics and Gynecology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Pregnancy-related conditions, gynecological disorders,
                    fertility issues, childbirth complications{" "}
                  </Radio>
                  <Radio
                    id="illness5"
                    value="Surgery"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Surgical conditions, injuries requiring surgical
                    intervention, post-operative care{" "}
                  </Radio>
                  <Radio
                    id="illness6"
                    value="Psychiatry"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Mental health disorders, anxiety, depression, bipolar
                    disorder, schizophrenia{" "}
                  </Radio>
                  <Radio
                    id="illness7"
                    value="Dermatology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Skin conditions, dermatitis, acne, psoriasis, skin cancer{" "}
                  </Radio>
                  <Radio
                    id="illness8"
                    value="Ophthalmology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Eye diseases, vision problems, cataracts, glaucoma, macular
                    degeneration
                  </Radio>
                  <Radio
                    id="illness9"
                    value="Ear Nose and Throat (ENT)"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Ear infections, sinusitis, tonsillitis, hearing loss, vocal
                    cord disorders{" "}
                  </Radio>
                  <Radio
                    id="illness10"
                    value="Cardiology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Heart diseases, hypertension, heart failure, arrhythmias,
                    coronary artery disease{" "}
                  </Radio>
                  <Radio
                    id="illness11"
                    value="Endocrinology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Diabetes, thyroid disorders, hormonal imbalances, metabolic
                    disorders
                  </Radio>
                  <Radio
                    id="illness12"
                    value="Gastroenterology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Digestive system disorders, gastrointestinal cancers,
                    irritable bowel syndrome, Crohn's disease{" "}
                  </Radio>
                  <Radio
                    id="illness13"
                    value="Neurology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Neurological disorders, migraines, epilepsy, stroke,
                    multiple sclerosis{" "}
                  </Radio>
                  <Radio
                    id="illness14"
                    value="Oncology"
                    //   onChange={(value) => handleChange(value)}
                  >
                    Cancer, various types and stages, chemotherapy, radiation
                    therapy, palliative care{" "}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
