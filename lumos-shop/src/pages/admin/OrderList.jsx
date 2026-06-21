import { useEffect, useState } from "react";
import {
  listOrdersRequest,
  updateOrderStatusRequest,
} from "../../services/orderService.js";

const statusOptions = [
  {
    value: "",
    label: "Todos",
  },
  {
    value: "AGUARDANDO_PAGAMENTO",
    label: "Aguardando pagamento",
  },
  {
    value: "ENVIADO",
    label: "Enviado",
  },
  {
    value: "CANCELADO",
    label: "Cancelado",
  },
];

function getStatusLabel(status) {
  if (status === "AGUARDANDO_PAGAMENTO") return "Aguardando pagamento";
  if (status === "ENVIADO") return "Enviado";
  if (status === "CANCELADO") return "Cancelado";

  return status;
}

function getStatusClass(status) {
  if (status === "AGUARDANDO_PAGAMENTO") {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  if (status === "ENVIADO") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "CANCELADO") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-zinc-50 text-zinc-700 border-zinc-200";
}

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState("");

  async function loadOrders(filters = {}) {
    try {
      setLoadingOrders(true);
      setError("");

      const data = await listOrdersRequest({
        status: selectedStatus,
        ...filters,
      });

      setOrders(data);
    } catch (error) {
      setError("Erro ao carregar pedidos");
    } finally {
      setLoadingOrders(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleFilter(event) {
    event.preventDefault();

    loadOrders({
      status: selectedStatus,
    });
  }

  function handleClearFilter() {
    setSelectedStatus("");

    loadOrders({
      status: "",
    });
  }

  async function handleUpdateStatus(orderId, newStatus) {
    try {
      setUpdatingOrderId(orderId);
      setError("");

      const updatedOrder = await updateOrderStatusRequest(orderId, newStatus);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? updatedOrder : order,
        ),
      );
    } catch (error) {
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Erro ao atualizar status do pedido",
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  return (
    <section>
      <section className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">Pedidos</h1>

            <p className="mt-1 text-sm text-zinc-500">
              Acompanhe e atualize o status dos pedidos da loja.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleFilter}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900 sm:max-w-xs"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-black"
          >
            Filtrar
          </button>

          <button
            type="button"
            onClick={handleClearFilter}
            className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            Limpar
          </button>
        </form>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loadingOrders ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Carregando pedidos...
          </p>
        ) : orders.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Nenhum pedido encontrado.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-zinc-200 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-base font-semibold text-zinc-900">
                        Pedido #{order.id}
                      </h2>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-zinc-600">
                      <p>
                        <span className="font-medium text-zinc-900">
                          Cliente:
                        </span>{" "}
                        {order.customerName}
                      </p>

                      <p>
                        <span className="font-medium text-zinc-900">
                          Telefone:
                        </span>{" "}
                        {order.phone}
                      </p>

                      {order.address && (
                        <p>
                          <span className="font-medium text-zinc-900">
                            Endereço:
                          </span>{" "}
                          {order.address}
                        </p>
                      )}

                      <p>
                        <span className="font-medium text-zinc-900">Data:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-55">
                    <p className="text-sm text-zinc-500">Total do pedido</p>

                    <strong className="mt-1 block text-2xl text-yellow-600">
                      {Number(order.total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>

                    <select
                      value={order.status}
                      disabled={updatingOrderId === order.id}
                      onChange={(event) =>
                        handleUpdateStatus(order.id, event.target.value)
                      }
                      className="mt-4 w-full rounded-full border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 disabled:opacity-60"
                    >
                      <option value="AGUARDANDO_PAGAMENTO">
                        Aguardando pagamento
                      </option>

                      <option value="ENVIADO">Enviado</option>

                      <option value="CANCELADO">Cancelado</option>
                    </select>

                    {updatingOrderId === order.id && (
                      <p className="mt-2 text-xs text-zinc-500">
                        Atualizando status...
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 border-t border-zinc-200 pt-4">
                  <h3 className="mb-3 text-sm font-semibold text-zinc-900">
                    Itens do pedido
                  </h3>

                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 overflow-hidden rounded-lg bg-zinc-200">
                            {item.product?.imageUrl && (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-zinc-900">
                              {item.product?.name || "Produto"}
                            </p>

                            <p className="text-xs text-zinc-500">
                              Quantidade: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-zinc-900">
                          {Number(item.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
