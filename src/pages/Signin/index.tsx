import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import server from "../../api/server";

import "./index.css";

import AuthForm from "../../components/Authform";

interface TokenUser {
  user: string;
  profile: string;
}

const Signin = () => {
  const navigate = useNavigate();

  const handleLogin = async (user: string, password: string) => {
    const response = await server.post("/security/login", {
      user,
      password,
    });

    const { accessToken } = response.data;
    localStorage.setItem("acessToken", accessToken);
    const decoded = jwtDecode(accessToken) as TokenUser;
    localStorage.setItem("user", decoded.user);
    localStorage.setItem("profile", decoded.profile);
    navigate("/home");
  };
  return (
    <AuthForm
      onSubmitForm={handleLogin}
      onSubmitButtonText="Login"
      onRouteText="Não tem uma conta? Faça o cadastro!"
      onRouteLink="/register"
    />
  );
};

export default Signin;
