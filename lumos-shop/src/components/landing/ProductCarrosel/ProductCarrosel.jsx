import { useRef, useState } from "react";
import { ProductCard } from "../card/ProductCard.jsx";

export function ProductCarousel({ products, title = "OFERTAS" }) {
    const [activeProduct, setActiveProduct] = useState(0);
    const carouselRef = useRef(null);

    function handleScroll(event) {
        const scrollLeft = event.currentTarget.scrollLeft;
        const cardWidth = event.currentTarget.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);

        setActiveProduct(index);
    }

    function goToProduct(index) {
        setActiveProduct(index);

        carouselRef.current?.scrollTo({
            left: carouselRef.current.offsetWidth * index,
            behavior: "smooth",
        });
    }

    if (products.length === 0) {
        return (
            <section className="bg-linear-to-b from-zinc-100 to-zinc-500 py-16">
                <div className="text-center">
                    <h2 className="text-sm font-semibold tracking-wide text-black">
                        {title}
                    </h2>

                    <p className="mt-4 text-sm text-zinc-600">
                        Nenhum produto encontrado nessa categoria.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-linear-to-b from-zinc-100 to-zinc-500 py-10">
            <div className="mb-8 flex justify-center">
                <div className="rounded-full bg-white px-14 py-3 shadow-md">
                    <h2 className="text-sm font-semibold tracking-wide text-black">
                        {title}
                    </h2>
                </div>
            </div>

            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:overflow-visible md:px-6"
            >
                {products.map((product) => (
                    <div key={product.id} className="min-w-full snap-center md:min-w-0">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="mt-4 flex justify-center gap-2 md:hidden">
                {products.map((product, index) => (
                    <button
                        key={product.id}
                        type="button"
                        onClick={() => goToProduct(index)}
                        className={`h-2 rounded-full transition-all ${activeProduct === index ? "w-6 bg-black" : "w-2 bg-zinc-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}