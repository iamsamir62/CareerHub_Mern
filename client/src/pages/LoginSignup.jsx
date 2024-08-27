import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isSignupPage, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="custom-gradient w-full  flex items-center justify-center pb-4 relative">
        <section className="min-w-80 sm:min-w-96  max-w-xl md:max-w-3xl flex flex-col md:flex-row items-center">
          <form>
            <div className="min-h-96 w-full bg-rightGradientColor flex flex-col gap-4 shadow-purple-400 shadow-md px-10 py-6 mt-10 rounded-xl items-center">
              <h2 className="text-center font-rubik text-purple-600 font-bold text-3xl tracking-wider">
                {isSignupPage ? "SIGN UP" : "LOGIN"}
              </h2>

              {isSignupPage && (
                <div className="text-left flex flex-col mt-2">
                  <label
                    htmlFor="Name"
                    className="text-white text-md font-semibold font-rubik"
                  >
                    Name :
                  </label>

                  <input
                    type="text"
                    className="w-56 sm:w-72 p-2 mt-2 bg-rightGradientColor rounded-md border-b border-purple-400 focus:outline-none text-white"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="text-left flex flex-col">
                <label
                  htmlFor="Email"
                  className="text-white text-md font-semibold font-rubik"
                >
                  Email :
                </label>

                <input
                  type="text"
                  className="w-56 sm:w-72 p-2 mt-2 bg-rightGradientColor border-b rounded-md border-purple-400 focus:outline-none text-white"
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
                  className="w-56 sm:w-72 p-2 mt-2 bg-rightGradientColor border-b rounded-md border-purple-400 focus:outline-none text-white"
                  placeholder="Enter your password"
                />
              </div>

              {isSignupPage && (
                <div className="text-left flex flex-col pb-8">
                  <label
                    htmlFor="Image"
                    className="text-white text-md font-semibold font-rubik"
                  >
                    Image :
                  </label>

                  <input
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    className="w-56 sm:w-72 p-2 mt-2 bg-rightGradientColor border-b border-purple-400 focus:outline-none text-white"
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
