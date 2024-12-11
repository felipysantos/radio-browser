import { Component } from "react";
import { APIService } from "./service/api";
import { CardComponent } from "./components/card";
import { DrawerComponent } from "./components/menu";
import { Grid2 } from "@mui/material";
import { ListContext } from "./context/list";
interface AppState {
  message: string;
  data: any[];
}

export class App extends Component<object, AppState> {
  private apiService: APIService;

  constructor(props: object) {
    super(props);
    this.state = {
      message: "",
      data: [],
    };
    this.apiService = new APIService();
  }

  async handleRadioChannels() {
    const request = this.apiService.createRequest();

    const data = await this.apiService.getRadioChannel(request, 10);

    this.setState({
      message: !data.length
        ? "Não há canais para serem exibidos."
        : "Radio Browser",
      data: data,
    });
  }

  componentDidMount(): void {
    this.handleRadioChannels();
  }

  render() {
    return (
      <Grid2>
        <Grid2 container>
          <h1>{this.state.message}</h1>
          <DrawerComponent>
            {this.state.data.map((el, index) => (
              <CardComponent key={index} mediaUrl={el.url} isMenuItem>
                {el.name}
              </CardComponent>
            ))}
          </DrawerComponent>
        </Grid2>

        <ListContext.Consumer>
          {(context) => {
            const { list } = context;
            return list.map((el: any, index: number) => (
              <Grid2 container key={index}>
                <h1>{el}</h1>
              </Grid2>
            ));
          }}
        </ListContext.Consumer>
      </Grid2>
    );
  }
}
