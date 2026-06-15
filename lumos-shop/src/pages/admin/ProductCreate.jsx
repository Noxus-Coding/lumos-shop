import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProductRequest } from "../../services/productService.js";
import { listCategoriesRequest } from "../../services/categoryServices.js";
import { uploadImageToCloudinary } from "../../services/cloudinaryService.js";

export function ProductCreate() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        costPrice: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await listCategoriesRequest();
                setCategories(data);
            } catch (error) {
                console.log("Erro ao carregar categorias", error);
            }
        }

        loadCategories();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    async function handleImageUpload(file) {
        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Formato inválido. Envie uma imagem PNG, JPG, JPEG ou WEBP.");
            return;
        }

        try {
            setUploadingImage(true);
            setError("");

            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            const imageUrl = await uploadImageToCloudinary(file);

            setForm((currentForm) => ({
                ...currentForm,
                imageUrl,
            }));
        } catch (error) {
            setError(error.message || "Erro ao enviar imagem");
        } finally {
            setUploadingImage(false);
        }
    }

    function handleDrop(event) {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        handleImageUpload(file);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await createProductRequest({
                name: form.name,
                description: form.description,
                costPrice: Number(form.costPrice),
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
        <section>
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
                            Categoria
                        </label>
                        <select
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
                            Imagem do produto
                        </label>

                        <label
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center transition hover:border-yellow-500 hover:bg-yellow-50"
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Prévia do produto"
                                    className="h-44 w-full rounded-xl object-cover"
                                />
                            ) : (
                                <div>
                                    <p className="text-sm font-semibold text-zinc-800">
                                        Arraste a imagem aqui
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        ou clique para selecionar uma imagem
                                    </p>

                                    <p className="mt-3 text-xs text-zinc-400">
                                        PNG, JPG, JPEG ou WEBP
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                className="hidden"
                                onChange={(event) =>
                                    handleImageUpload(event.target.files[0])
                                }
                            />
                        </label>

                        {uploadingImage && (
                            <p className="mt-2 text-xs text-zinc-500">
                                Enviando imagem para o Cloudinary...
                            </p>
                        )}

                        {form.imageUrl && !uploadingImage && (
                            <p className="mt-2 break-all text-xs text-green-600">
                                Imagem enviada com sucesso.
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Preço de custo
                            </label>
                            <input
                                name="costPrice"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.costPrice}
                                onChange={handleChange}
                                placeholder="Ex: 80.00"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Preço de venda
                            </label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Ex: 169.99"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Estoque
                        </label>
                        <input
                            name="stock"
                            type="number"
                            min="0"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Quantidade"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="w-full rounded-full bg-yellow-500 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-60"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar produto"}
                    </button>
                </form>
            </section>
        </section>
    );
}