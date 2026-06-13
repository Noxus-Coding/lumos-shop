import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../components/ui/modal/modal.jsx";
import {
    deleteProductRequest,
    listProductsRequest,
} from "../../services/productService.js";
import { listCategoriesRequest } from "../../services/categoryServices.js";
import { BsFilterLeft } from "react-icons/bs";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [error, setError] = useState("");
    const [sort, setSort] = useState("recent");
    const [sortOpen, setSortOpen] = useState(false);

    async function loadProducts(filters = {}) {
        try {
            setLoadingProducts(true);
            setError("");

            const data = await listProductsRequest({
                search,
                categoryId: selectedCategoryId,
                sort,
                ...filters,
            });

            setProducts(data);
        } catch (error) {
            setError("Erro ao carregar produtos");
        } finally {
            setLoadingProducts(false);
        }
    }

    async function loadCategories() {
        try {
            const data = await listCategoriesRequest();
            setCategories(data);
        } catch (error) {
            console.log("Erro ao carregar categorias", error);
        }
    }

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    function handleFilter(event) {
        event.preventDefault();

        loadProducts({
            search,
            categoryId: selectedCategoryId,
            sort,
        });
    }

    function handleClearFilters() {
        setSearch("");
        setSelectedCategoryId("");
        setSort("recent");

        loadProducts({
            search: "",
            categoryId: "",
            sort: "recent",
        });
    }

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

    const sortOptions = [
        {
            value: "recent",
            label: "Recentes",
            icon: BsFilterLeft,
        },
        {
            value: "price_asc",
            label: "Menor preço",
            icon: TbArrowBigDown,
        },
        {
            value: "price_desc",
            label: "Maior preço",
            icon: TbArrowBigUp,
        },
    ];

    const selectedSortOption = sortOptions.find(
        (option) => option.value === sort
    );

    return (
        <section>
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

                <form
                    onSubmit={handleFilter}
                    className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px_180px_auto_auto]"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Pesquisar por nome ou descrição"
                        className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
                    />   

                    <select
                        value={selectedCategoryId}
                        onChange={(event) => setSelectedCategoryId(event.target.value)}
                        className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
                    >
                        <option value="">Todas as categorias</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setSortOpen((current) => !current)}
                            className="flex w-full items-center justify-between rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 outline-none transition hover:border-zinc-900"
                        >
                            <span className="flex items-center gap-2">
                                {selectedSortOption && (
                                    <>
                                        {(() => {
                                            const Icon = selectedSortOption.icon;
                                            return <Icon className="text-base text-zinc-500" />;
                                        })()}

                                        {selectedSortOption.label}
                                    </>
                                )}
                            </span>

                            <FiChevronDown
                                className={`text-zinc-500 transition ${sortOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {sortOpen && (
                            <div className="absolute left-0 top-12 z-20 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                                {sortOptions.map((option) => {
                                    const Icon = option.icon;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                setSort(option.value);
                                                setSortOpen(false);
                                            }}
                                            className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition ${sort === option.value
                                                    ? "bg-yellow-50 text-yellow-700"
                                                    : "text-zinc-700 hover:bg-zinc-100"
                                                }`}
                                        >
                                            <Icon className="text-base" />
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="flex items-center rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold
                         text-white transition hover:bg-black"
                    >
                        <VscSettings className="mr-2" />
                        Filtrar
                    </button>

                    <button
                        type="button"
                        onClick={handleClearFilters}
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

                {loadingProducts ? (
                    <p className="py-8 text-center text-sm text-zinc-500">
                        Carregando produtos...
                    </p>
                ) : products.length === 0 ? (
                    <p className="py-8 text-center text-sm text-zinc-500">
                        Nenhum produto encontrado.
                    </p>
                ) : (
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

                                        <p className="mt-1 text-xs text-zinc-500">
                                            Categoria: {product.category?.name || "Sem categoria"}
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
                )}
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
        </section>
    );
}