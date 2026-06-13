import { api } from "./api";

export async function createProductRequest(data) {
  const response = await api.post("/products", data);
  return response.data;
}

export async function listProductsRequest(filters = {}) {
  const params = {};

  if (
    filters.categoryId !== undefined &&
    filters.categoryId !== null &&
    filters.categoryId !== ""
  ) {
    params.categoryId = filters.categoryId;
  }

  if (
    filters.search !== undefined &&
    filters.search !== null &&
    filters.search.trim() !== ""
  ) {
    params.search = filters.search;
  }

  if (
    filters.sort !== undefined &&
    filters.sort !== null &&
    filters.sort !== ""
  ) {
    params.sort = filters.sort;
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