import axios from "axios";
import { FormValues } from "../componenets/AddUser";

export const getUsersAsync = async () => {
  const response = await axios.get("http://localhost:3004/users");
  return response.data;
};

export const setUserAsync = async (data: Partial<FormValues>) => {
  await axios.post("http://localhost:3004/users", data);
};

export const getUserAsync = async (id: string) => {
  const data = await axios.get("http://localhost:3004/users/" + id);
  return data.data;
};

export const changeUserAsync = async ({
  data,
  id,
}: {
  data: Partial<FormValues>;
  id: string;
}) => {
  await axios.put("http://localhost:3004/users/" + id, data);
};

export const deleteUserAsync = async (id: number) => {
  await axios.delete("http://localhost:3004/users/" + id);
};
