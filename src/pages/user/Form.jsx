import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../help';


export default function Form() {
  const navigate = useNavigate();

  // Define your role variable here or fetch it as needed
  if (!auth()) { // Only call auth() and check if authenticated
  }
    const info = JSON.parse(localStorage.getItem("info"));
    console.log(info)
    if (
      info.id != null &&
      info.auth != null &&
      info.user != null &&
      info.email != null &&
      info.role != null &&
      info.first != null &&
      info.last != null &&
      info.gender != null &&
      info.birth != null &&
      info.phone != null &&
      info.study != null
    ) {
      window.location.href= "/dashboard" ;
    }
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
    confirm("are u sure this informatios is correct");
    if (Object.keys(validationErrors).length === 0) {
      try {
      const token = localStorage.getItem("token");
      

      const requestBody = {
        token : token,
        data: {
          first: formData.first,
          last:  formData.last,
          birth: formData.birth,
          gender : formData.gender,
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
          const data = await response;
          
          localStorage.setItem("info",JSON.stringify(formData));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-blue-100 to-gray-300 p-4">
      <div className="mt-6 lg:ml-[44%] ml-[26%] mb-5">
      <a
        href="https://www.instagram.com/robixe.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex space-x-2 hover:text-blue-800"
      >
        <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6  -mt-1 " />
        <span className="text-[12px] font-bold ">Developed by Robixe</span>
      </a>
    </div>
    <div className="container max-w-5xl mx-auto p-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl -mt-1 ">
    <h1 className="lg:text-[34px] text-[30px] font-bold text-blue-800 text-center mb-2 -mt-4">Candidate Information</h1>
    <p className="text-center text-lg font-semibold text-gray-700 mb-2">
      Tell us a little more about yourself
    </p>
    <p className="text-center text-sm text-gray-600 mb-10">
      To complete your registration, please fill out the form below with accurate details. Double-check all information for accuracy before submitting.
    </p>

    <form className="grid gap-6 w-full" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-800">First Name</label>
          <input
            type="text"
            name="first"
            value={formData.first}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          {errors.first && <p className="text-red-500 text-sm">{errors.first}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800">Last Name</label>
          <input
            type="text"
            name="last"
            value={formData.last}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.last && <p className="text-red-500 text-sm">{errors.last}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800">Birth Date</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.birth && <p className="text-red-500 text-sm">{errors.birth}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800">Field of Study</label>
          <select
            name="study"
            value={formData.study}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

      <div className="space-y-3">
        <h3 className="font-semibold text-[16px]">As a candidate, I agree to the following terms:</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="over18"
            checked={formData.over18}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm">I confirm that I am 18 years old or older.</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm">I accept all terms and conditions.</span>
        </label>
        {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
      </div>

      <div className="-mb-3 text-center ">
        <button
          type="submit"
          className=" lg:w-[15%] bg-blue-800  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Confirm
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
