import { useState, useEffect } from "react";
import { createRequest, getRadioChannel } from "./service/api";
import { CardComponent } from "./components/card";
import { DrawerComponent } from "./components/menu";
import {
  Box,
  Button,
  Grid2,
  Input,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ListContext } from "./context/listContext";
import { AccordionComponent } from "./components/menuDesktop";

export const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleRadioChannels = async (more?: number) => {
    const request = createRequest();
    const count = more ? 10 + more : 10;
    const data = await getRadioChannel(request, count);
    setData(data);
  };

  const handleChangeSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    handleRadioChannels();
  }, []);

  return (
    <Grid2
      container
      alignContent={isMobile ? "center" : ""}
      justifyContent={"start"}
    >
      {data ? (
        <AccordionComponent>
          <Input
            sx={{
              width: "100%",
              border: "1px solid #1976D2",
              borderRadius: "4px",
              paddingX: "5px",
            }}
            value={search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <Typography variant="body2" color="textSecondary">
              Pesquise por Nome, País ou Idioma.
            </Typography>
          )}
          {Array.isArray(data) &&(search
            ? data
                .filter((el) => {
                  const name = el?.name?.toLowerCase() || "";
                  const country = el?.country?.toLowerCase() || "";
                  const language = el?.language?.toLowerCase() || "";
                  const lowerSearch = search.toLowerCase();

                  return (
                    name.includes(lowerSearch) ||
                    country.includes(lowerSearch) ||
                    language.includes(lowerSearch)
                  );
                })
                .map((el) => (
                  <CardComponent mediaUrl={el.url} isMenuItem>
                    {el}
                  </CardComponent>
                ))
            : data.map((el) => (
                <CardComponent mediaUrl={el.url} isMenuItem>
                  {el}
                </CardComponent>
              )))}
          <Box width={"100%"} marginTop={1.5}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#19D1B7",
              }}
              onClick={() => handleRadioChannels(10)}
            >
              Mais
            </Button>
          </Box>
        </AccordionComponent>
      ) : (
        <h1>Não há estações para exibir</h1>
      )}

      <Grid2 marginLeft={4}>
        <Grid2 container>
          <Typography variant="h3">Radio Browser</Typography>
          <DrawerComponent display="none">
            <Input
              sx={{
                width: "100%",
                border: "1px solid #1976D2",
                borderRadius: "4px",
                paddingX: "5px",
              }}
              value={search}
              onChange={(e) => handleChangeSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
              <Typography variant="body2" color="textSecondary">
                Pesquise por Nome, País ou Idioma.
              </Typography>
            )}
            {Array.isArray(data) &&(search
              ? data
                  .filter((el) => {
                    const name = el?.name?.toLowerCase() || "";
                    const lowerSearch = search.toLowerCase();
                    return name.includes(lowerSearch);
                  })
                  .map((el) => (
                    <CardComponent mediaUrl={el.url} isMenuItem>
                      {el}
                    </CardComponent>
                  ))
              : data.map((el) => (
                  <CardComponent mediaUrl={el.url} isMenuItem>
                    {el}
                  </CardComponent>
                )))}
            <Box width={"100%"} marginTop={1.5}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#19D1B7",
                }}
                onClick={() => handleRadioChannels(10)}
              >
                Mais
              </Button>
            </Box>
          </DrawerComponent>
        </Grid2>

        {/* Lista de Favoritos */}
        <ListContext.Consumer>
          {(context) => {
            const { list } = context;

            return (
              <Grid2>
                {!list.length ? (
                  <Typography variant="h6">
                    Adicione uma estação favorita
                  </Typography>
                ) : (
                  list.map((el: any) => {
                    return (
                      <CardComponent mediaUrl={el.url} isMenuItem={false}>
                        {el}
                      </CardComponent>
                    );
                  })
                )}
              </Grid2>
            );
          }}
        </ListContext.Consumer>
      </Grid2>
    </Grid2>
  );
};
