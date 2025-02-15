import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./authform";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "https://spend-smart-3x86.vercel.app/api/v1/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return <AuthForm isLogin={false} onSubmit={handleSignup} />;
};

export default SignupPage;
