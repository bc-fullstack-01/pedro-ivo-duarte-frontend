import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Stack, TextField, Button } from "@mui/material";

import logo from "../../assets/logo.svg";

interface Props {
  onSubmitForm: any;
  onSubmitButtonText: string;
  onRouteText: string;
  onRouteLink: string;
}

const AuthForm = ({
  onSubmitForm,
  onSubmitButtonText,
  onRouteText,
  onRouteLink,
}: Props) => {
  const [user, setUser] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(user.value, password.value);
  };

  return (
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
              {onSubmitButtonText}
            </Button>
          </Stack>
          <Link to={onRouteLink}>{onRouteText}</Link>
        </Stack>
      </form>
    </Container>
  );
};

export default AuthForm;
