import React, { useState } from "react";

const steps = [
  { title: "Step 1", fields: ["name", "email"] },
  { title: "Step 2", fields: ["age", "address"] },
  { title: "Step 3", fields: ["city", "country"] },
];

const Form = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  // Handles the input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validates current step fields
  const validateStep = () => {
    const currentStepFields = steps[step].fields;
    const stepErrors = {};

    currentStepFields.forEach((field) => {
      if (!formData[field]) {
        stepErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Valid email is required";
      } else if (field === "age" && isNaN(formData.age)) {
        stepErrors.age = "Valid age is required";
      }
    });

    return stepErrors;
  };

  // Navigates to the next step if no errors
  const handleNextStep = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  // Navigates to the previous step
  const handlePrevStep = () => setStep(step - 1);

  // Handles final submission if no errors
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length === 0) {
      alert(
        "Form submitted successfully! \n" + JSON.stringify(formData, null, 2)
      );
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-slate-800 to-slate-950 text-white flex flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col py-4 px-8 bg-slate-600 rounded-md gap-8">
        <h3 className="text-2xl font-bold">{steps[step].title}</h3>
        {steps[step].fields.map((field) => (
          <div key={field}>
            <label className="flex gap-4 self-start justify-start">
              <p className="capitalize text-lg">{field}</p>:
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "age"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="text-lg p-2 rounded-md text-slate-800"
              />
            </label>
            {errors[field] && <p className="text-red-400">{errors[field]}</p>}
          </div>
        ))}

        <div className="flex justify-between items-center">
          {step > 0 && (
            <button type="button" onClick={handlePrevStep} className="px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-500">
              Previous
            </button>
          )}
          {step < steps.length - 1 && (
            <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-cyan-600 text-white rounded-md font-semibold hover:bg-cyan-500">
              Next
            </button>
          )}
          {step === steps.length - 1 && <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-500">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default Form;
