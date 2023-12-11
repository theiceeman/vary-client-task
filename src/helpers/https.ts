import axios from "axios";

// const baseUrl = process.env.REACT_APP_API_URL;

export const Request = {
  post: async (url: any, data: any) => {
    // console.log({url, data})
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        return { ok: true, data: response };
      })
      .catch((error: any) => {
        return { ok: false, data: error };
      });
  },

  get: async (url: any, config?: any) => {
    const headers = config?.headers;

    return await axios.get(url, {
      ...config,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": import.meta.env.VITE_APP_APP_URL,
      },
    })
      .then((response: any) => {
        return { ok: true, data: response };
      })
      .catch((error: any) => {
        return { ok: false, data: error };
      });
  },
};
