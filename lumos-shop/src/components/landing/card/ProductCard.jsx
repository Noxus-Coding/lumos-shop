import { useCart } from "../../../contexts/cartContext.jsx";

import { MdAddShoppingCart } from "react-icons/md";

export function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <article className="overflow-hidden rounded-t-4xl bg-white shadow-xl">
            <div className="h-56 bg-zinc-200">
                {product.imageUrl && (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            <div className="p-5 text-center">
                <p className="text-xs text-zinc-600">{product.category?.name}</p>

                <h3 className="mt-1 text-md font-semibold text-black">
                    {product.name}
                </h3>

                <p className="mt-3 text-2xl font-bold text-yellow-500">
                    {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>

                <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className="mt-4 w-full flex justify-center items-center gap-2 rounded-lg border border-zinc-300 
                    py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:cursor-not-allowed 
                    disabled:opacity-50 hover:cursor-pointer"
                >
                    <MdAddShoppingCart size={20} className="lg:-ml-5"/>
                    {product.stock <= 0 ? "Indisponível" : "Adicionar"}
                </button>
            </div>
        </article>
    );
}