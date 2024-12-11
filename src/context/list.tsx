import { createContext, Component } from "react";

export const ListContext = createContext<any>(null);

interface ListProviderProps {
  children: any;
}

interface ListProviderState {
  list: any[];
}

export class ListProvider extends Component<
  ListProviderProps,
  ListProviderState
> {
  constructor(props: ListProviderProps) {
    super(props);
    this.state = {
      list: [],
    };
  }

  toggleItem = (element: any) => {
    this.setState((prevState) => {
      const isElementInList = prevState.list.includes(element);

      return {
        list: isElementInList
          ? prevState.list.filter((el) => el !== element)
          : [...prevState.list, element],
      };
    });
  };

  render() {
    const { list } = this.state;
    return (
      <ListContext.Provider
        value={{
          list,
          toggleItem: this.toggleItem,
        }}
      >
        {this.props.children}
      </ListContext.Provider>
    );
  }
}
