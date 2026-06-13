import { api } from "./api";

export async function listOrdersRequest(filter = {}) {
    const params = {};

    if (
        filter.status !== undefined &&
        filter.status !== null &&
        filter.status !== ""
    ) {
        params.status = filter.status;
    }

    const response = await api.get("/orders", { params });
    return response.data;
}

export async function updateOrderStatusRequest(id, status) {
    const response = await api.patch(`/orders/${id}/status`, {
        status,
    });

    return response.data;
}