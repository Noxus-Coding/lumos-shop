import { useEffect, useState } from "react";

import Head from "../assets/img/Head.png";

import { CategoryNav } from "../components/landing/CategoryNavbar";
import { HeaderLanding } from "../components/landing/header/HeaderLanding";
import { ProductCarousel } from "../components/landing/ProductCarrosel/ProductCarrosel.jsx";

import { listCategoriesRequest } from "../services/categoryServices";
import { listProductsRequest } from "../services/productService.js";

import ImgEnvios from "../assets/img/IconEnvio.png";
import ImgJoiaModel from "../assets/img/IconJoia.png";
import ImgLocation from "../assets/img/IconEndereco.png";
import { FooterLanding } from "../components/landing/footer/FooterLading.jsx";

export function LandingPage() {
    const [categories, setCategories] = useState([]);
    const [offersProducts, setOffersProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);

    async function loadCategories() {
        try {
            const data = await listCategoriesRequest();
            setCategories(data);
        } catch (error) {
            console.log("Erro ao carregar categorias", error);
        }
    }

    async function loadOffersProducts() {
        try {
            const data = await listProductsRequest();

            setOffersProducts(data.slice(0, 3));
        } catch (error) {
            console.log("Erro ao carregar ofertas", error);
        }
    }

    async function loadCategoryProducts(categoryId = null) {
        try {
            setLoadingProducts(true);

            const data = await listProductsRequest({
                categoryId,
            });

            setCategoryProducts(data);
        } catch (error) {
            console.log("Erro ao carregar produtos por categoria", error);
        } finally {
            setLoadingProducts(false);
        }
    }

    function handleSelectCategory(categoryId) {
        setSelectedCategoryId(categoryId);
        loadCategoryProducts(categoryId);
    }

    function getSelectedCategoryName() {
        if (selectedCategoryId === null) {
            return "TODOS OS PRODUTOS";
        }

        const category = categories.find(
            (category) => category.id === selectedCategoryId
        );

        return category ? category.name.toUpperCase() : "PRODUTOS";
    }

    useEffect(() => {
        loadCategories();
        loadOffersProducts();
        loadCategoryProducts(null);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <HeaderLanding />

            <CategoryNav
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
            />

            <main className="w-full">
                <section className="w-full">
                    <img
                        src={Head}
                        alt="Imagem de destaque da Lumos"
                        className="h-65 w-full object-cover object-center sm:h-90 md:h-auto"
                    />
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 py-8">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="flex items-center justify-start gap-5 md:justify-center">
                            <img
                                src={ImgEnvios}
                                alt="Ícone de envio de pedidos"
                                className="h-9 w-9 object-contain"
                            />

                            <div className="max-w-55">
                                <h3 className="text-base font-semibold text-black">
                                    Envio Nacional
                                </h3>
                                <p className="text-xs font-medium leading-tight text-zinc-700">
                                    Mandamos para qualquer lugar do Brasil
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-start gap-5 md:justify-center">
                            <img
                                src={ImgJoiaModel}
                                alt="Ícone de joia"
                                className="h-9 w-9 object-contain"
                            />

                            <div className="max-w-55">
                                <h3 className="text-base font-semibold text-black">
                                    Prata 925 legítima
                                </h3>
                                <p className="text-xs font-medium leading-tight text-zinc-700">
                                    Todas as nossas peças são em 925 de verdade
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-start gap-5 md:justify-center">
                            <img
                                src={ImgLocation}
                                alt="Ícone de localização"
                                className="h-9 w-9 object-contain"
                            />

                            <div className="max-w-55">
                                <h3 className="text-base font-semibold text-black">
                                    Sob encomenda
                                </h3>
                                <p className="text-xs font-medium leading-tight text-zinc-700">
                                    A gente faz peças sob encomenda
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <ProductCarousel
                    products={offersProducts}
                    title="OFERTAS"
                    background="gradient"
                />

                {loadingProducts ? (
                    <section className="flex min-h-75 items-center justify-center bg-white">
                        <p className="text-sm text-zinc-500">
                            Carregando produtos...
                        </p>
                    </section>
                ) : (
                    <ProductCarousel
                        products={categoryProducts}
                        background="white"
                        title={getSelectedCategoryName()}
                    />
                )}
            </main>

            <FooterLanding />
        </div>
    );
}