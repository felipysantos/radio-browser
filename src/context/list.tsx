import { createContext, useEffect, useState } from "react";

export const ListContext = createContext<any>(null);

interface ListProviderProps {
  children: any;
}

export const ListProvider = ({ children }: ListProviderProps) => {
  const [list, setList] = useState<any[]>(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  const toggleItem = (element: any) => {
    if (!element || !element.changeuuid) {
      console.error("Elemento inválido ou 'changeuuid' ausente");
      return;
    }
    
    setList((prevList) => {
      const isElementInList = prevList.some(
        (el) => el.changeuuid === element.changeuuid
      );

      return isElementInList
        ? prevList.filter((el) => el.changeuuid !== element.changeuuid)
        : [...prevList, element];
    });
  };

  const editItem = (element: any, editedElement: any) => {
    setList((prevList) => {
      return prevList.map((item) => (item === element ? editedElement : item));
    });
  };

  useEffect(() => {
    const savedList = localStorage.getItem("myList");
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  return (
    <ListContext.Provider value={{ list, toggleItem, editItem }}>
      {children}
    </ListContext.Provider>
  );
};
