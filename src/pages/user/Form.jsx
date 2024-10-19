import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../help';


export default function Form() {
  const navigate = useNavigate();

  // Define your role variable here or fetch it as needed
    auth();

  const [formData, setFormData] = useState({
    first: "", 
    last: "",
    birth: "",
    gender: "",
    phone: "",
    study: "", 
    over18: false,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first) newErrors.first = "First name is required";
    if (!formData.last) newErrors.last = "Last name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.birth) newErrors.birth = "Birth date is required";
    if (!formData.over18) newErrors.over18 = "You must confirm you are 18 or older.";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length === 0) {
      try {
      const token = localStorage.getItem("Token");
      console.log("Token:", token);

      const requestBody = {
        token,
        data: {
          first: formData.first,
          last:  formData.last,
          birth: formData.birth,
          phone: formData.phone,
          study: formData.study,
        },
      };

        const response = await fetch("https://infom4th-api.robixe.online/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Data submitted successfully:", data);
          navigate("/dashboard");
        } else {
          const errorText = await response.text();
          console.error(`Error: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error("Failed to submit data:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-3">Candidate Information</h1>
      <p className="text-center text-[18px] font-bold text-gray-600 mb-2">
        Tell us a little more about yourself
      </p>
      <p className="text-center text-[15px] text-gray-600 mb-10">
        To complete your registration, please fill out the form below with accurate details. Double check all information for accuracy before submitting.
      </p>
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[14px] text-gray-700">First Name</label>
            <input
              type="text"
              name="first"
              value={formData.first}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
            {errors.first && <p className="text-red-500 text-sm">{errors.first}</p>}
          </div>

          <div>
            <label className="text-[14px] text-gray-700">Last Name</label>
            <input
              type="text"
              name="last"
              value={formData.last}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
            {errors.last && <p className="text-red-500 text-sm">{errors.last}</p>}
          </div>

          <div>
            <label className="text-[14px] text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
            {errors.birth && <p className="text-red-500 text-sm">{errors.birth}</p>}
          </div>

          <div>
            <label className="text-[14px] text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="text-[14px] text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-[14px] text-gray-700">Field of Study</label>
            <select
              name="study"
              value={formData.study}
              onChange={handleChange}
              className="border rounded text-[14px] w-full py-2 px-3 mb-10"
            >
              <option value="">Select Field</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Geology">Geology</option>
              <option value="Environmental Science">Environmental Science</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold">As a candidate, I agree to the following terms:</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="over18"
              checked={formData.over18}
              onChange={handleChange}
              required
            />
            <span>I confirm that I am 18 years old or older.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <span>I accept all terms and conditions.</span>
          </label>
          {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
