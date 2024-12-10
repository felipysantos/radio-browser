import { Component } from "react";
import { APIService } from "./service/api";
import { CardComponent } from "./components/card";
interface AppState {
  message: string;
  data: any[];
}

export class App extends Component<object, AppState> {
  private apiService: APIService;

  constructor(props: object) {
    super(props);
    this.state = {
      message: "Bem-vindo ao App básico em React!",
      data: [],
    };
    this.apiService = new APIService();
  }

  handleChangeMessage = async () => {
    const request = this.apiService.createRequest();

    const data = await this.apiService.getRadioChannel(request, 10);

    this.setState({
      message: !data.length
        ? "Não há canais para serem exibidos."
        : "Lista de Canais",
      data: data,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <>
          {this.state.data.map((el, index) => (
            <CardComponent key={index}>{el.votes}</CardComponent>
          ))}
        </>

        <button onClick={this.handleChangeMessage}>Clique aqui</button>
      </div>
    );
  }
}
