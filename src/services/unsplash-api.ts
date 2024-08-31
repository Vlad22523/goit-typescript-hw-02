import axios, { AxiosResponse } from "axios";
import { UnsplashResponse } from "../types/types";

export const fetchData = async (
  ApiKey: string,
  query: string,
  page: number = 1
): Promise<UnsplashResponse> => {
  const BaseURL = "https://api.unsplash.com/search/photos";
  const response = await axios.get<UnsplashResponse>(
    `${BaseURL}?client_id=${ApiKey}`,
    {
      params: {
        query: query,
        client_id: ApiKey,
        per_page: "10",
        page: page,
      },
    }
  );
  return response.data;
};
