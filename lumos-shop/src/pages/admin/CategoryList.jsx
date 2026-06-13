import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal/modal.jsx";
import {
    createCategoryRequest,
    deleteCategoryRequest,
    listCategoriesRequest,
} from "../../services/categoryServices.js";

export function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadCategories() {
        try {
            setLoadingCategories(true);
            setError("");

            const data = await listCategoriesRequest();
            setCategories(data);
        } catch (error) {
            setError("Erro ao carregar categorias");
        } finally {
            setLoadingCategories(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function handleCreateCategory(event) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Digite o nome da categoria.");
            return;
        }

        try {
            setLoadingCreate(true);
            setError("");
            setSuccess("");

            const newCategory = await createCategoryRequest({
                name: name.trim(),
            });

            setCategories((currentCategories) => [
                ...currentCategories,
                newCategory,
            ]);

            setName("");
            setSuccess("Categoria cadastrada com sucesso.");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Erro ao cadastrar categoria"
            );
        } finally {
            setLoadingCreate(false);
        }
    }

    function openDeleteModal(category) {
        setSelectedCategory(category);
        setModalOpen(true);
    }

    async function handleDeleteCategory() {
        try {
            setLoadingDelete(true);
            setError("");
            setSuccess("");

            await deleteCategoryRequest(selectedCategory.id);

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== selectedCategory.id
                )
            );

            setModalOpen(false);
            setSelectedCategory(null);
            setSuccess("Categoria excluída com sucesso.");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Erro ao excluir categoria"
            );
        } finally {
            setLoadingDelete(false);
        }
    }

    return (
        <section>
            <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-zinc-900">
                        Categorias
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500">
                        Cadastre e gerencie as categorias dos produtos da loja.
                    </p>
                </div>

                <form
                    onSubmit={handleCreateCategory}
                    className="mb-6 flex flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nome da categoria"
                        className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
                    />

                    <button
                        type="submit"
                        disabled={loadingCreate}
                        className="rounded-full bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-60"
                    >
                        {loadingCreate ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </p>
                )}

                {loadingCategories ? (
                    <p className="py-8 text-center text-sm text-zinc-500">
                        Carregando categorias...
                    </p>
                ) : categories.length === 0 ? (
                    <p className="py-8 text-center text-sm text-zinc-500">
                        Nenhuma categoria cadastrada.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <article
                                key={category.id}
                                className="flex items-center justify-between rounded-xl border border-zinc-200 p-4"
                            >
                                <div>
                                    <h2 className="text-sm font-semibold text-zinc-900">
                                        {category.name}
                                    </h2>

                                    <p className="text-xs text-zinc-500">
                                        ID: {category.id}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => openDeleteModal(category)}
                                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                >
                                    Excluir
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <Modal
                isOpen={modalOpen}
                title="Excluir categoria"
                message="Você deseja realmente excluir a categoria"
                highlight={selectedCategory?.name}
                confirmText="Excluir"
                cancelText="Cancelar"
                loading={loadingDelete}
                onConfirm={handleDeleteCategory}
                onCancel={() => setModalOpen(false)}
            />
        </section>
    );
}