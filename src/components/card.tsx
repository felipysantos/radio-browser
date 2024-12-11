import { Button, Grid2, IconButton } from "@mui/material";
import { Component, createRef } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";
import { ListContext } from "../context/list";

interface CardState {
  [key: string]: unknown;
}

interface CardProps {
  children: any;
  mediaUrl?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  isMenuItem: boolean;
}

export class CardComponent extends Component<CardProps, CardState> {
  private audioRef = createRef<HTMLAudioElement>();

  constructor(props: CardProps) {
    super(props);
    this.state = {
      isClicked: false,
      isPlaying: false,
    };
  }

  togglePlayPause = () => {
    if (this.audioRef.current) {
      if (this.state.isPlaying) {
        this.audioRef.current.pause();
      } else {
        this.audioRef.current.play();
      }
      this.setState({ isPlaying: !this.state.isPlaying });
    }
  };

  render() {
    const { children, isMenuItem } = this.props;

    return (
      <ListContext.Consumer>
        {(context) => {
          if (!context) {
            return null;
          }
          const { list, toggleItem } = context;

          return isMenuItem ? (
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => toggleItem(children)}
            >
              {children}
            </Button>
          ) : (
            list.map((el: any, index: number) => (
              <Grid2
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                key={index}
              >
                <IconButton onClick={this.togglePlayPause}>
                  {!this.state.isPlaying ? (
                    <IoIosPlayCircle />
                  ) : (
                    <IoPauseCircle />
                  )}
                </IconButton>
                <p>{el.name}</p>
                <audio ref={this.audioRef}>
                  <source src={el.mediaUrl} type="audio/mp3" />
                </audio>
              </Grid2>
            ))
          );
        }}
      </ListContext.Consumer>
    );
  }
}
