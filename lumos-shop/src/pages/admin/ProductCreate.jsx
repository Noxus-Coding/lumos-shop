import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProductRequest } from "../../services/productService.js";

export function ProductCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await createProductRequest({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                imageUrl: form.imageUrl,
                categoryId: form.categoryId ? Number(form.categoryId) : null,
            });

            navigate("/admin/products");
        } catch (error) {
            setError(error.response?.data?.error || "Erro ao cadastrar produto");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-zinc-100 px-4 py-8">
            <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-xl font-semibold text-zinc-900">
                    Cadastrar produto
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nome do produto
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Digite o nome do produto"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Tipo/Categoria
                        </label>
                        <input
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleChange}
                            placeholder="ID da categoria"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Descrição do produto"
                            className="min-h-28 w-full resize-none rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Imagem
                        </label>
                        <input
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            placeholder="URL da imagem"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Preço
                            </label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Ex: 169.99"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Estoque
                            </label>
                            <input
                                name="stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Quantidade"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-yellow-500 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-60"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar produto"}
                    </button>
                </form>
            </section>
        </main>
    );
}