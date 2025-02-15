import React from "react";
import ShinyText from "../ui/shinytext";

const AuthForm = ({ isLogin, onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282c34] text-white">
      <div className="bg-[#1c1f24] rounded-lg shadow-lg p-8 w-96">
        {/* Image at the top */}
        <div className="flex justify-center mb-6">
         
        <ShinyText text={isLogin ? "LOGIN" : "SIGN UP"}  disabled={false} speed={3} className='text-2xl font-bold text-center' />
        <h1 className="text-2xl font-bold text-center ml-2"> TO SPEND SMART</h1>
        </div>

        {/* Form Heading */}
        
        

        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Name Field (Only for Signup) */}
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-300 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-[#282c34] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-[#282c34] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-[#282c34] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href={isLogin ? "/signup" : "/login"}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
