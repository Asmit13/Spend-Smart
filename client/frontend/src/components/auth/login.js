import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./authform";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
        if (data.success) {
            // Save the token
            localStorage.setItem("authToken", data.token);
            console.log("Login successful!");
            navigate("/dashboard")
        } else {
            console.error("Login failed:", data.message);
        }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default LoginPage;
