import axios, { AxiosInstance } from "axios";

export const createRequest = (): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getRadioChannel = async (
  request: AxiosInstance,
  limit: number
) => {
  try {
    const { data } = await request.get("/search", {
      params: {
        limit,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      message: "Error ao buscar os canais de rádio. Tente novamente!",
    };
  }
};
