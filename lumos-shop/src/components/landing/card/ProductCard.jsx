import { useCart } from "../../../contexts/cartContext.jsx";

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

                <h3 className="mt-1 text-sm font-semibold text-black">
                    {product.name}
                </h3>

                <p className="mt-3 text-base font-bold text-black">
                    {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>

                <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className="mt-4 w-full rounded-md border border-zinc-300 
                    py-2 text-xs font-medium transition hover:bg-black hover:text-white disabled:cursor-not-allowed 
                    disabled:opacity-50 hover:cursor-pointer"
                >
                    {product.stock <= 0 ? "Indisponível" : "Adicionar"}
                </button>
            </div>
        </article>
    );
}