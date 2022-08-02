import React from "react";
import server from "../../api/server";

import AuthForm from "../../components/Authform";

const Signup = () => {
  const handleRegister = async (user: string, password: string) => {
    await server.post("/security/registry", {
      user,
      password,
    });
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
