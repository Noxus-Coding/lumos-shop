import { api } from "./api";

export async function listCategoriesRequest() {
    const response = await api.get("/categories");
    return response.data;
}

export async function createCategoryRequest(data) {
    const response = await api.post("/categories", data);
    return response.data;
}

export async function deleteCategoryRequest(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}