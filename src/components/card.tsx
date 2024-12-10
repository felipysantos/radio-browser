import { Component } from "react";
import { Button } from "@chakra-ui/react";
interface CardState {
  [key: string]: unknown;
}

interface CardProps {
  children: any;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export class CardComponent extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }
  render() {
    const { children } = this.props;

    return <Button>{children}</Button>;
  }
}
