import { Axios } from "axios";

export const getModDescription = async (axiosClient: Axios, modId: number) => {
  const response = await axiosClient.get<{ data: string }>(
    `/mod/${modId}/description`
  );
  return response.data.data;
};
