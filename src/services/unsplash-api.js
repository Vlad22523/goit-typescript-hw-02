import axios from "axios";

export const fetchData = async (ApiKey, query, page = 1) => {
  const BaseURL = "https://api.unsplash.com/search/photos";
  const response = await axios.get(`${BaseURL}?client_id=${ApiKey}`, {
    params: {
      query: query,
      client_id: ApiKey,
      per_page: "10",
      page: page,
    },
  });
  return response.data;
};
