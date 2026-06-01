import { api } from "./api";

export async function createProductRequest(data) {
  const response = await api.post("/products", data);
  return response.data;
}

export async function listProductsRequest(categoryId) {
  const params = {};

  if (categoryId) {
    params.categoryId = categoryId;
  }

  const response = await api.get("/products", { params });
  return response.data;
}

export async function updateProductRequest(id, data) {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
}

export async function deleteProductRequest(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}