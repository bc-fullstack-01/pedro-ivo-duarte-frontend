import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, Scale } from "@mui/icons-material";
import "./index.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: Props) {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [hoverDrop, setHoverDrop] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        border: "2px solid #6a7987",
        borderRadius: "5px",
        background: "#FFFFFD",
        transform: hoverDrop ? "scale(1.01)" : "scale(1)",
        transition: "ease-in-out 140ms",
        boxShadow: hoverDrop
          ? "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
          : "",
      }}
      onMouseEnter={() => setHoverDrop(true)}
      onMouseLeave={() => setHoverDrop(false)}
      {...getRootProps()}
      className="dropzone"
    >
      <input {...getInputProps()} />

      {selectedFileUrl ? (
        <img
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          src={selectedFileUrl}
          alt="Point thumbnail"
        />
      ) : (
        <p>
          <ImageIcon />
        </p>
      )}
    </div>
  );
}

export default Dropzone;
