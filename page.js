"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showHide, setShowHide] = useState(true); // Initially hide the password
  const [showConfirmPassword, setShowConfirmPassword] = useState(true); // For confirm password field

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleShoeHide = () => {
    setShowHide(!showHide);
  };

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Update signinData and signupData whenever email or password changes
    setSigninData({ email, password });
    setSignupData({ email, password, confirmPassword });

    // Check if sign-in data matches stored sign-up data
  }, [email, password, confirmPassword]);

  const handleData = () => {
    localStorage.setItem("signIn", JSON.stringify(signinData));
    console.log("Sign in data stored:", signinData);
  };

  const handleSignUp = () => {
    const storedSignUpData = JSON.parse(localStorage.getItem("signUp"));
    if (
      storedSignUpData &&
      email === storedSignUpData.email &&
      password === storedSignUpData.password
    ) {
      alert("Login successful!");
      localStorage.setItem("signUp", JSON.stringify({...storedSignUpData,signupData}));
    } else {
      alert("enter valid email and password");
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      // ... handle other input fields
    }
  };

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final form submission, e.g., send data to server
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Age:", selectedAge);
      // ... other data
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-900 font-bold mb-6 text-2xl text-center"
            >
              What is your first name?
            </label>
            <input
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Name"
              value={firstName}
              onChange={handleInputChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="mb-4">
            <p className="mb-4 mt-4 mx-16 font-bold  text-gray-900 text-3xl">
              How old are you?
            </p>
            <p className="text-sm text-gray-600 px-4 text-center mt-8 mb-16">
              I'll recommend products and routines tailored perfectly for your
              age
            </p>
            <div className="space-y-4">
              {["13-17", "18-24", "25-34", "35-44", "45-54", "55+"].map(
                (ageRange) => (
                  <label
                    key={ageRange}
                    className="flex items-center bg-white px-3 py-3 rounded-md"
                  >
                    <span className="flex-grow text-lg font-bold">
                      {ageRange}
                    </span>{" "}
                    <input
                      type="radio"
                      name="age"
                      value={ageRange}
                      checked={selectedAge === ageRange}
                      onChange={handleAgeChange}
                      className="form-radio h-4 w-4 accent-pink-500 cursor-pointer"
                    />
                  </label>
                )
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mb-4">
            <label
              htmlFor="sensitiveSkin"
              className="block text-gray-900 font-bold mt-10 mb-10 text-center text-2xl"
            >
              Would you consider your skin sensitive?
            </label>

            <div>
              <div className="space-y-4">
                {/* Sensitive Skin Card */}
                <label className="bg-white rounded-lg shadow-md p-4 flex items-center">
                  <div className="bg-pink-200 rounded-full p-3 mr-4">
                    {/* Replace with your sensitive skin icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      {/* ... your SVG path here ... */}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Sensitive Skin</h3>
                    <p className="text-gray-600">
                      Certain skincare products have caused irritation before.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="sensitiveSkin"
                      value="sensitive"
                      onChange={handleAgeChange}
                      className="form-radio h-4 w-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                </label>

                {/* Non-Sensitive Skin Card */}
                <label className="bg-white rounded-lg shadow-md p-4 flex items-center">
                  <div className="bg-pink-200 rounded-full p-3 mr-4">
                    {/* Replace with your non-sensitive skin icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      {/* ... your SVG path here ... */}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Non Sensitive Skin</h3>
                    <p className="text-gray-600">
                      My skin is generally tolerant of new skincare formulas.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="sensitiveSkin"
                      value="notSensitive"
                      onChange={handleAgeChange}
                      className="form-radio h-4 w-4  accent-pink-500 cursor-pointer"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="mb-4">
            <p className="mb-16 mt-4 font-bold text-3xl mx-3 text-gray-900">
              What is your skin type?
            </p>
            <p className="text-sm text-gray-600 mb-8 px-4 text-center mt-8 ">
              My skin is generally tolerant of new skincare formulas.
            </p>

            <div className="space-y-4">
              {["Oily", "Normal", "Dry", "Combination"].map((skinType) => (
                <label
                  key={skinType}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center"
                >
                  <div className="bg-pink-200 rounded-full p-3 mr-4">
                    {/* Replace with your skin type icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      {/* ... your SVG path here ... */}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg ml-4">{skinType} Skin</h3>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="skinType"
                      value={skinType.toLowerCase()}
                      onChange={handleAgeChange}
                      className="form-radio h-4 w-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="mb-4">
            <p className="mb-16 mt-4 mx-4 font-bold text-3xl text-center text-gray-900">
              What is your main skincare goal?
            </p>

            <div className="space-y-4">
              {[
                "Get rid of blemishes",
                "Slow aging",
                "Minimize fine lines and wrinkles",
                "Balance oily-prone skin",
                "Fade dark spots and scars",
                "Improve skin health",
              ].map((goal) => (
                <label
                  key={goal}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg ml-4">{goal}</h3>
                  </div>
                  <div className="ml-auto">
                    <input
                      type="radio"
                      name="skincareGoal"
                      value={goal}
                      onChange={handleAgeChange}
                      className="w-4 h-4 accent-pink-500"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <svg
              className="m-auto my-40"
              width="306"
              height="306"
              viewBox="0 0 306 306"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.591843 152.698H5.2647C5.2647 234.16 71.6694 300.44 153.285 300.44C234.9 300.44 301.305 234.16 301.305 152.698C301.305 71.2361 234.909 4.95605 153.285 4.95605V0.291962C237.483 0.291962 305.977 68.6583 305.977 152.698C305.977 236.738 237.483 305.104 153.285 305.104C69.0868 305.104 0.591843 236.738 0.591843 152.698Z"
                fill="url(#paint0_linear_4001_220)"
              />
              <path
                d="M290.817 151.994C290.817 75.7877 229.241 14.3275 153.284 14.7192C77.3259 15.1109 15.7501 77.2062 15.7501 153.413C15.7501 229.62 77.3259 291.08 153.284 290.688C229.241 290.296 290.817 228.201 290.817 151.994Z"
                stroke="#FF9093"
                strokeWidth="2.04545"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8.18 8.18"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4001_220"
                  x1="153.285"
                  y1="0.291962"
                  x2="153.285"
                  y2="305.113"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF9093" />
                  <stop offset="1" stopColor="#FF9093" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            <p className="text-sm text-gray-600 mb-2 px-4 text-center mt-6   ">
              You’re almost there! Just a few more questions to finalize your
              skincare routine.
            </p>

            <p
              type="submit"
              className=" text-center text-red-500 font-bold mt-2  px-2 py-2"
            >
              Scan your face
            </p>
          </div>
        );

      case 7:
        return (
          <div className=" rounded-lg  w-96 ">
            <h2 className="text-2xl font-bold mb-4 text-center mr-44 mt-10">
              Sign Up Account
            </h2>
            <p className="text-gray-600 text-center mb-6 mr-52 ">
              Sign up to Get Started!
            </p>
            <form onSubmit={handleSubmit}>
              {/* Email */}

              <div className="mt-10 p-5 ">
                <label
                  htmlFor="email"
                  className="block text-black  font-bold mb-2  "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  className="border-2 rounded-2xl border-red-300 p-3 w-full bg-red-100"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}

              <div className="p-5">
                <label
                  htmlFor="password"
                  className="block text-black mb-2 font-bold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showHide ? "password" : "text"}
                    autoComplete="off"
                    id="password"
                    className="border-2 rounded-2xl border-red-300 p-3 w-full bg-red-100"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={handleShoeHide}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div className="p-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-black mb-2 font-bold"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "password" : "text"}
                    autoComplete="off"
                    id="confirmPassword"
                    className="border-2 rounded-2xl border-red-300 p-3 w-full bg-red-100"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={handleShowConfirmPassword}
                  >
                    {/* You can add an icon here for show/hide password */}
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Replace with your desired icon */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-center mb-6 mr-2 mt-28 text-xs ">
                By signing up, you agree to our Terms. See how we use your data
                in our Privacy Police. we never post to any social media
              </p>
            </form>
          </div>
        );

      case 8:
        return (
          <div className=" rounded-lg  w-96 ">
            <h2 className="text-2xl font-bold mb-4 text-center mr-44 mt-10">
              Sign In Account
            </h2>
            <p className="text-gray-600 text-center mb-6 mr-28 ">
              Hello, welcome back to our account
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-10 p-5 ">
                <label
                  htmlFor="email"
                  className="block text-black  font-bold mb-2  "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  className="border-2 rounded-2xl border-red-300 p-3 w-full bg-red-100"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 p-5">
                <label
                  htmlFor="password"
                  className="block text-black mb-2 font-bold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showHide ? "password" : "text"}
                    autoComplete="off"
                    id="password"
                    className="border-2 rounded-2xl border-red-300 p-3 w-full bg-red-100"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {/* You can add an icon here for show/hide password */}
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      onClick={handleShoeHide}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Replace with your desired icon */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        );

      // ... render content for other steps
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-red-100 rounded-lg shadow-md flex flex-col h-lvh">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="h-8 w-8 p-1 text-red-400 cursor-pointer bg-white border rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg text-center font-bold justify-center content-center">
            Question {currentStep} of 8
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow justify-between"
        >
          {renderStepContent()}
          <div className="mt-auto">
            {currentStep < 7 ? (
              <button
                type="submit"
                className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Next
              </button>
            ) : currentStep === 7 ? (
              <button
                type="submit"
                className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={() => handleData()} // Call handleData for sign-in
              >
                Sign In
              </button>
            ) : (
              <button
                type="button" // Changed to type="button" to prevent form submission
                className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={() => handleSignUp()} // Call handleSignUp for sign-up
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
