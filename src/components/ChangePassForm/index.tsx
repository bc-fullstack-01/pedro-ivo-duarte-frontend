import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import server from "../../api/server";

interface Password {
  password: {
    value: string;
    error: string;
  };
  confirmPassword: {
    value: string;
    error: string;
  };
}

const ChangePassForm = ({ token }: { token: string }) => {
  const [input, setInput] = useState({
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      input.password.value &&
      input.confirmPassword.value &&
      !error.password &&
      !error.confirmPassword
    ) {
      const { password } = input;
      try {
        const response = await server.put(
          `/users/me`,
          { password: password.value },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.clear();
        navigate("/");
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: {
        value,
        error: "",
      },
    }));
    validateInput(e);
  };

  const validateInput = ({ target }: any) => {
    let { name, value } = target;

    setError((prevState) => {
      const stateObj = { ...prevState, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj["password"] = "Por favor digite uma senha.";
          } else if (
            input.confirmPassword.value &&
            value !== input.confirmPassword.value
          ) {
            stateObj.confirmPassword = "A senhas digitadas não coincidem";
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj["confirmPassword"] =
              "Por favor digite a senha de confirmação";
          } else if (input.password.value && value !== input.password.value) {
            stateObj["confirmPassword"] = "A senhas digitadas não coincidem";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

  const { password, confirmPassword } = input;

  return (
    <form onSubmit={handleOnSubmit}>
      <Stack spacing={2}>
        <TextField
          variant="outlined"
          label="Nova senha"
          type="password"
          name="password"
          value={password.value}
          onChange={handleInputChange}
          onBlur={validateInput}
        />
        {error.password && <span className="err">{error.password}</span>}

        <TextField
          variant="outlined"
          label="Confirmar nova senha"
          type="password"
          name="confirmPassword"
          value={confirmPassword.value}
          onChange={handleInputChange}
          onBlur={validateInput}
        />
        {error.confirmPassword && (
          <span className="err">{error.confirmPassword}</span>
        )}
        <Button variant="outlined" type="submit">
          Mudar senha!
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePassForm;
