import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { ListContext } from "../context/list";

interface CardProps {
  children: any;
  mediaUrl?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  isMenuItem: boolean;
}

export const CardComponent = ({
  children,
  isMenuItem,
  mediaUrl,
}: CardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { list, toggleItem, editItem } = useContext(ListContext);
  const [isEditable, setEditable] = useState(false);
  const [newName, setNewName] = useState("");

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const editable = () => {
    setEditable(!isEditable);
    setNewName("");
  };

  const saveEdit = (data: any) => {
    setEditable(!isEditable);

    data.name = newName;

    editItem(children, data);
  };

  return isMenuItem ? (
    <Box width={"100%"} marginTop={1.5}>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        onClick={() => toggleItem(children)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {children.name}
          <span
            style={{
              fontSize: "0.8rem",
              textTransform: "lowercase",
              color: "#fff",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "80%",
            }}
          >
            {children.country}
          </span>
        </div>
        {list.find((el: any) => el.changeuuid === children.changeuuid) ? (
          <FaCheck />
        ) : (
          ""
        )}
      </Button>
    </Box>
  ) : (
    <Grid2 container rowSpacing={1} alignItems={"center"} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      <IconButton onClick={togglePlayPause}>
        {!isPlaying ? <IoIosPlayCircle /> : <IoPauseCircle />}
      </IconButton>

      <Typography>{children.name}</Typography> - 
      <Typography>{children.country}</Typography>

      <audio ref={audioRef}>
        <source src={mediaUrl} type="audio/mp3" />
      </audio>

      <input
        value={newName}
        style={{
          display: isEditable ? "block" : "none",
          border: "2px solid black",
          padding: 0,
          margin: 0,
          height: "auto",
        }}
        required
        onChange={(e) => setNewName(e.target.value)}
      />

      <Button
        sx={{ display: isEditable ? "none" : "block" }}
        onClick={() => editable()}
      >
        Editar
      </Button>
      <Button
        sx={{ display: isEditable ? "none" : "block" }}
        onClick={() => toggleItem(children)}
      >
        Excluir
      </Button>

      <Button
        sx={{ display: !isEditable ? "none" : "block" }}
        onClick={() => saveEdit(children)}
      >
        Salvar
      </Button>

      <Button
        sx={{ display: !isEditable ? "none" : "block" }}
        onClick={() => editable()}
      >
        Cancelar
      </Button>
    </Grid2>
  );
};
