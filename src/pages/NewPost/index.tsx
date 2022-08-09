import { Button, Container, Stack, TextField } from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar";
import Dropzone from '../../components/Dropzone';

const NewPost = () => {
  return (
    <div>
      <CustomAppBar title="Novo Post" />
      <Container sx={{marginTop: '88px'}}>
        <Stack spacing={6}>
          <TextField 
            variant="standard" 
            label="Título" 
            name="title" 
          />
          <TextField
            variant="standard"
            label="O que está acontecendo?"
            name="description"
            multiline
            minRows={2}

          />
          <Dropzone onFileUploaded={() => {}} />
          <Button type="submit" variant="contained">
            Publicar
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default NewPost;
