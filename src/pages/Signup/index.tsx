import React from "react";
import { useNavigate } from "react-router-dom";
import server from "../../api/server";

import AuthForm from "../../components/Authform";

const Signup = () => {
  const navigate = useNavigate();
  const handleRegister = async (user: string, password: string) => {
    try {
      await server.post("/security/register", {
        user,
        password,
      });

      navigate("/")
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AuthForm
      onSubmitForm={handleRegister}
      onSubmitButtonText="Cadastrar"
      onRouteText="Já tem uma conta? faça login!"
      onRouteLink="/"
    />
  );
};

export default Signup;
