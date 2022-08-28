import axios from "axios";

if (!process.env.CURSE_API_KEY) throw new Error("CURSE_API_KEY is not set");

export const axiosClient = axios.create({
  baseURL: "https://api.curseforge.com",
  headers: {
    "x-api-key": process.env.CURSE_API_KEY,
  },
});
