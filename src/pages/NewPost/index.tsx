import { Button, Container, Stack, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import Dropzone from "../../components/Dropzone";
import server from "../../api/server";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { title, description } = formData;
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      const response = await server.post("/posts", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <CustomAppBar title="Novo Post" />
      <Container sx={{ marginTop: "88px" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <TextField
              variant="standard"
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            { !selectedFile && <TextField
              variant="standard"
              label="O que está acontecendo?"
              name="description"
              multiline
              minRows={2}
              value={formData.description}
              onChange={handleInputChange}
            />}
            <Dropzone onFileUploaded={setSelectedFile} />
            <Button type="submit" variant="contained">
              Publicar
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
};

export default NewPost;
