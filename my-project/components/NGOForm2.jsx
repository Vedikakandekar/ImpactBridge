import React, { useState } from "react";
import * as Yup from "yup";
import Nav from "./Navbar";
import './tailwind.css';

const NGOForm2 = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    registrationCertFile: null,
    constitutionFile: null,
    financialStatementsFile: null,
    taxExemptionFile: null,
    boardOfDirectorsFile: null,
    projectReportsFile: null,
  };

  const handleSubmit = async (values) => {
  
    // If validation passes, submit the form data to the backend

    try{
      const resp = await fetch("http://localhost:8080/api/NGOAcc2",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(values),
      });
     
      if(Response.ok){
          const data = await resp.json();
          console.log(data);
          alert("success");

      }else{
        alert("Error");
      }
    }
    catch(error){
      console.log(error);
      alert(error);

    }
    console.log(values);
  };

  const fileValidation = (file, acceptedFormats, maxSize) => {
    if (!file) {
      return "File is required";
    }

    const fileType = file.type;
    const fileSize = file.size / 1024 / 1024; // Convert to MB

    if (!acceptedFormats.includes(fileType)) {
      return "Invalid file format";
    }

    if (fileSize > maxSize) {
      return "File size exceeds the limit";
    }

    return undefined; // Validation passed
  };

  const validationSchema = Yup.object().shape({
    registrationCertFile: Yup.mixed()
      .required("Registration Certificate is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(
            file,
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            2
          )
      ),
    constitutionFile: Yup.mixed()
      .required("Constitution or Bylaws is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(
            file,
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            2
          )
      ),
    financialStatementsFile: Yup.mixed()
      .required("Financial Statements is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(file, ["application/pdf", "application/vnd.ms-excel", "text/csv"], 2)
      ),
    taxExemptionFile: Yup.mixed()
      .required("Tax Exemption Certificate is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(file, ["application/pdf", "image/jpeg", "image/png"], 2)
      ),
    boardOfDirectorsFile: Yup.mixed()
      .required("Board of Directors or Trustees Information is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(
            file,
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            2
          )
      ),
    projectReportsFile: Yup.mixed()
      .required("Project Reports or Impact Assessments is required")
      .test(
        "fileFormat",
        "Invalid file format or size",
        (file) =>
          fileValidation(
            file,
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            2
          )
      ),
  });

  const handleChange = (event, setFieldValue) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setFieldValue(name, files[0]);
    }
  };

  

  return (
    <div>
      <Nav />
      <div
        className="flex items-center justify-center h-screen text-black auth-temp ngo-form"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 68px)',
          maxHeight: '100%', // adjust as needed
        }}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-screen-lg px-8 bg-[]">
          <div className="w-full md:flex md:flex-row md:items-center md:justify-between">
            <div className="md:inline md:w-[45%] w-full mb-10 md:mb-0">
              <div style={{maxWidth: '450px', margin: '0 auto'}} className="hide" >
                <h1 className='text-2xl mb-2'>Lorem ipsum dolor sit.</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Provident tenetur perspiciatis expedita magnam maiores recusandae
                  odio minima saepe impedit ut?
                </p>
              </div>
            </div>
            <div className="auth-component">
              <div className="w-full overflow-hidden" style={{maxWidth: 'none', backdropFilter: 'blur(5px)' , margin: '0 auto'}}>
                <div className="max-w-lg mx-auto rounded-xl shadow-md p-6 border">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                      <label className="font-bold" style={{ fontSize: "36px" }}>
                        Documents Verification
                      </label>
                      <br />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="registrationCertFile">
                      Registration Certificate
                    </label>
                    <input
                      id="registrationCertFile"
                      name="registrationCertFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    {/* Add fields for other file inputs here */}
                    {/* Constitution or Bylaws */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="constitutionFile">
                      Constitution or Bylaws
                    </label>
                    <input
                      id="constitutionFile"
                      name="constitutionFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    {/* Financial Statements */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="financialStatementsFile">
                      Financial Statements
                    </label>
                    <input
                      id="financialStatementsFile"
                      name="financialStatementsFile"
                      type="file"
                      accept=".pdf,.xlsx,.csv"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    {/* Tax Exemption Certificate */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxExemptionFile">
                      Tax Exemption Certificate
                    </label>
                    <input
                      id="taxExemptionFile"
                      name="taxExemptionFile"
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    {/* Board of Directors or Trustees Information */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="boardOfDirectorsFile">
                      Board of Directors or Trustees Information
                    </label>
                    <input
                      id="boardOfDirectorsFile"
                      name="boardOfDirectorsFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    {/* Project Reports or Impact Assessments */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="projectReportsFile">
                      Project Reports or Impact Assessments
                    </label>
                    <input
                      id="projectReportsFile"
                      name="projectReportsFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(event) => handleChange(event, setFieldValue)}
                      required
                    />
                    <div className="text-sm text-red-500">{errorMessage}</div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOForm2;
