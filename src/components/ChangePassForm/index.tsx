import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import server from "../../api/server";

const ChangePassForm = ({ token }: { token: string }) => {
  const [passwd, setPasswd] = useState({ value: "", error: "" });
  const [confirmPasswd, setConfirmPasswd] = useState({ value: "", error: "" });
  const navigate = useNavigate();

  const handleChangePasswd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(passwd.value);
    if (passwd.value === confirmPasswd.value) {
      try {
        const response = await server.put(
          `/users/me`,
          { password: passwd.value },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        localStorage.clear();
        navigate("/");
      } catch (err) {
        alert(err);
      }
    } else {
      alert("As senhas precisam ser iguais!");
    }
  };

  return (
    <form onSubmit={handleChangePasswd}>
      <Stack spacing={2}>
        <TextField
          variant="outlined"
          label="Nova senha"
          type="password"
          value={passwd.value}
          onChange={(e) => setPasswd({ value: e.target.value, error: "" })}
        />
        <TextField
          variant="outlined"
          label="Confirmar nova senha"
          type="password"
          value={confirmPasswd.value}
          onChange={(e) =>
            setConfirmPasswd({ value: e.target.value, error: "" })
          }
        />
        <Button variant="outlined" type="submit">
          Mudar senha!
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePassForm;
