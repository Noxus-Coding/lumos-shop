import { api } from "./api";

export async function listCategoriesRequest() {
    const response = await api.get("/categories");

    return response.data;
}