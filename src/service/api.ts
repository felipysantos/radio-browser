import axios, { AxiosInstance } from "axios";

export class APIService {
  // constructor() {}

  createRequest() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getRadioChannel(request: AxiosInstance, limit: number) {
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
  }
}
