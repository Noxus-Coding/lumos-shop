import { Link } from "react-router-dom";
import { IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";

import { useCart } from "../contexts/cartContext";

export function Cart() {
  const {
    cartItems,
    subtotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 md:px-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black"
          >
            <FiArrowLeft />
            Voltar
          </Link>

          <h1 className="text-lg font-semibold text-zinc-900">
            Carrinho
          </h1>

          <div className="w-16" />
        </header>

        <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
          <div className="flex max-w-sm flex-col items-center text-center">
            <IoCartOutline className="mb-6 text-7xl text-black" />

            <h2 className="text-xl font-bold text-black">
              Seu carrinho está vazio
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Para continuar comprando, navegue pelo site, faça a busca pelo seu
              produto ou clique no botão abaixo.
            </p>

            <Link
              to="/"
              className="mt-8 w-full rounded-sm bg-zinc-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black md:w-auto md:px-16"
            >
              Escolher produto
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black"
        >
          <FiArrowLeft />
          Voltar
        </Link>

        <h1 className="text-lg font-semibold text-zinc-900">
          Carrinho
        </h1>

        <div className="w-16" />
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[1fr_360px] md:px-10">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 border-b border-zinc-200 pb-5"
            >
              <div className="h-24 w-24 overflow-hidden rounded-sm bg-zinc-200">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <IoTrashOutline className="text-xl text-zinc-500 hover:text-red-600 hover:cursor-pointer" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-zinc-300">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 text-sm"
                    >
                      -
                    </button>

                    <span className="px-3 py-1 text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>

                  <strong className="text-base text-black">
                    {(item.price * item.quantity).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit border-t border-zinc-200 pt-6 md:border md:p-6">
          <h2 className="text-sm font-medium text-zinc-700">
            Subtotal do carrinho
          </h2>

          <strong className="mt-2 block text-3xl font-semibold text-black">
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>

          <button className="mt-6 w-full rounded-full bg-yellow-500 px-5 py-3 
          text-sm font-semibold text-white transition hover:bg-yellow-600 hover:cursor-pointer">
            Finalizar compra
          </button>

          <Link
            to="/"
            className="mt-4 block w-full rounded-full border border-zinc-300 px-5 py-3 
            text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:cursor-pointer"
          >
            Continuar comprando
          </Link>
        </aside>
      </section>
    </main>
  );
}