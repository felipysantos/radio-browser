import { Button, SwipeableDrawer } from "@mui/material";
import { Component } from "react";

interface DrawerState {
  [key: string]: any;
}

interface DrawerProps {
  children: any;
}

export class DrawerComponent extends Component<DrawerProps, DrawerState> {
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({ isOpen: true });
    return;
  };

  onClose = () => {
    this.setState({ isOpen: false });
    return;
  };

  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    return (
      <>
        <Button onClick={this.onOpen}>Open</Button>

        <SwipeableDrawer
          anchor="right"
          open={isOpen}
          onClose={this.onClose}
          onOpen={this.onOpen}
        >
          {children}
        </SwipeableDrawer>
      </>
    );
  }
}
