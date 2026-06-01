import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../components/ui/modal/modal.jsx";
import {
    deleteProductRequest,
    listProductsRequest,
} from "../../services/productService.js";

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState("");

    async function loadProducts() {
        try {
            const data = await listProductsRequest();
            setProducts(data);
        } catch (error) {
            setError("Erro ao carregar produtos");
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    function openDeleteModal(product) {
        setSelectedProduct(product);
        setModalOpen(true);
    }

    async function handleDeleteProduct() {
        try {
            setLoadingDelete(true);

            await deleteProductRequest(selectedProduct.id);

            setProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== selectedProduct.id)
            );

            setModalOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            setError(error.response?.data?.error || "Erro ao excluir produto");
        } finally {
            setLoadingDelete(false);
        }
    }

    return (
        <main className="min-h-screen bg-zinc-100 px-4 py-8">
            <section className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-xl font-semibold text-zinc-900">
                        Produtos cadastrados
                    </h1>

                    <Link
                        to="/admin/products/create"
                        className="rounded-full bg-yellow-500 px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-yellow-600"
                    >
                        Cadastrar produto
                    </Link>
                </div>

                <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Digite o nome do produto"
                        className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
                    />

                    <button className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white">
                        Filtrar
                    </button>
                </div>

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="space-y-4">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 overflow-hidden rounded-lg bg-zinc-200">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-zinc-900">
                                        {product.name}
                                    </h2>

                                    <p className="text-xs text-zinc-500">
                                        {product.description}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-yellow-600">
                                        {Number(product.price).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </p>

                                    <p className="text-xs text-zinc-500">
                                        Estoque: {product.stock}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    to={`/admin/products/${product.id}/edit`}
                                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
                                >
                                    Editar
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => openDeleteModal(product)}
                                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                                >
                                    Excluir
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <Modal
                isOpen={modalOpen}
                title="Excluir produto"
                message="Você deseja realmente excluir o produto"
                highlight={selectedProduct?.name}
                confirmText="Excluir"
                cancelText="Cancelar"
                loading={loadingDelete}
                onConfirm={handleDeleteProduct}
                onCancel={() => setModalOpen(false)}
            />
        </main>
    );
}