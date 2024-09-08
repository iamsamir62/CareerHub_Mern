import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading, setUser } from "@/redux/authSlice";

const LoginSignup = () => {
  const [isSignupPage, setIsSignUp] = useState(false);
  /* const [loading, setLoading] = useState(false); */
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    file: null,
    contact: "",
    role: "candidate",
  });
  const [selectedRole, setSelectedRole] = useState("candidate");
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Separate handler for radio change
  const handleRadioChange = (value) => {
    setSelectedRole(value);
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      let res;
      if (isSignupPage) {
        // Sign-up request
        const formDataToSend = new FormData();
        formDataToSend.append("fullname", formData.fullname);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("contact", formData.contact);
        formDataToSend.append("role", formData.role);

        if (formData.file) {
          formDataToSend.append("file", formData.file);
        }

        res = await axios.post(
          `${USER_API_END_POINT}/register`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({
            fullname: "",
            email: "",
            password: "",
            file: null,
            contact: "",
            role: "candidate",
          });
          navigate("/auth"); // Navigate to /auth after signup
        }
      } else {
        // Login request
        res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.data));
          console.log(res.data.data);

          toast.success(res.data.message);
          console.log(res.data.message);

          navigate("/"); // Navigate to / after login
        }
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="custom-gradient w-full flex items-center justify-center pb-4 relative">
        <section className="min-w-80 sm:min-w-96 max-w-xl md:max-w-3xl flex flex-col md:flex-row items-center">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="min-h-96 w-full bg-rightGradientColor flex flex-col gap-4 shadow-purple-400 shadow-md px-10 py-6  rounded-xl items-center">
              <h2 className="text-center font-rubik text-purple-600 font-bold text-3xl tracking-wider">
                {isSignupPage ? "SIGN UP" : "LOGIN"}
              </h2>

              {isSignupPage && (
                <div className="text-left flex flex-col mt-2">
                  <label
                    htmlFor="name"
                    className="text-white text-md font-semibold font-rubik"
                  >
                    Name :
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-56 sm:w-72 p-2 mt-2 bg-gray-800 rounded-md border-b border-purple-400 focus:outline-none text-white"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              {isSignupPage && (
                <div className="text-left flex flex-col mt-2">
                  <label
                    htmlFor="contact"
                    className="text-white text-md font-semibold font-rubik"
                  >
                    Phone :
                  </label>
                  <input
                    type="number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-56 sm:w-72 p-2 mt-2 bg-gray-800 rounded-md border-b border-purple-400 focus:outline-none text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              )}

              <div className="text-left flex flex-col">
                <label
                  htmlFor="email"
                  className="text-white text-md font-semibold font-rubik"
                >
                  Email :
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-56 sm:w-72 p-2 mt-2 bg-gray-800 border-b rounded-md border-purple-400 focus:outline-none text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div className="text-left flex flex-col">
                <label
                  htmlFor="password"
                  className="text-white text-md font-semibold font-rubik"
                >
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-56 sm:w-72 p-2 mt-2 bg-gray-800 border-b rounded-md border-purple-400 focus:outline-none text-white"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex gap-4 text-white">
                <label className="text-md ml-[-44px] font-semibold font-rubik ">
                  Role:
                </label>
                <RadioGroup
                  value={selectedRole}
                  onValueChange={(value) => handleRadioChange(value)} // Use onValueChange instead of onChange
                  className="flex flex-row space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="candidate"
                      id="r1"
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedRole === "candidate"
                          ? "border-purple-600 bg-purple-600"
                          : "border-gray-300"
                      }`}
                    />
                    <Label htmlFor="r1" className="text-white">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="recruiter"
                      id="r2"
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedRole === "recruiter"
                          ? "border-purple-600 bg-purple-600"
                          : "border-gray-300"
                      }`}
                    />
                    <Label htmlFor="r2" className="text-white">
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {isSignupPage && (
                <div className="text-left flex flex-col pb-8">
                  <label
                    htmlFor="image"
                    className="text-white text-md font-semibold font-rubik"
                  >
                    Image :
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-56 sm:w-72 p-2 mt-2 bg-gray-800 border-b border-purple-400 focus:outline-none text-white"
                    placeholder="Upload your image"
                  />
                </div>
              )}

              <button
                type="submit"
                className="border px-8 rounded-md shadow-lg tracking-wide bg-purple-600 text-md font-semibold py-1 border-none text-white hover:bg-purple-800"
              >
                {loading ? "Loading..." : "SUBMIT"}
              </button>

              <span
                className="text-white underline cursor-pointer"
                onClick={() => setIsSignUp(!isSignupPage)}
              >
                {isSignupPage
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default LoginSignup;
