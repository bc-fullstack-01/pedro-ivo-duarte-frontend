import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import jwtDecode from "jwt-decode";
import server from "../../api/server";

import logo from "../../assets/logo.svg";

import "./index.css";

interface TokenUser {
  user: string;
  profile: string;
}

const Signin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await server.post("/security/login", {
      user: user.value,
      password: password.value,
    });

    const { accessToken } = response.data;
    localStorage.setItem("acessToken", accessToken);
    const decoded = jwtDecode(accessToken) as TokenUser;
    localStorage.setItem("user", decoded.user);
    localStorage.setItem("profile", decoded.profile);
    navigate("/home");
  };
  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack
            spacing={6}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img className="logo" src={logo} alt="" />
            <Stack
              spacing={6}
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <TextField
                variant="outlined"
                label="Usuário"
                name="user"
                value={user.value}
                onChange={(e) => setUser({ value: e.target.value, error: "" })}
              ></TextField>

              <TextField
                variant="outlined"
                label="Senha"
                type="password"
                value={password.value}
                onChange={(e) =>
                  setPassword({ value: e.target.value, error: "" })
                }
              ></TextField>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Stack>
            <Link to="/security/registry">Não tem uma conta? Faça o cadastro</Link>
          </Stack>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
