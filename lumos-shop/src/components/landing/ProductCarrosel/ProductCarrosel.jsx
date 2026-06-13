import { useRef, useState } from "react";
import { ProductCard } from "../card/ProductCard.jsx";

export function ProductCarousel({
    products = [],
    title = "OFERTAS",
    background = "gradient",
}) {
    const [activeProduct, setActiveProduct] = useState(0);
    const carouselRef = useRef(null);

    const sectionBackground =
        background === "gradient"
            ? "bg-gradient-to-b from-zinc-100 to-zinc-500"
            : "bg-white";

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
            <section className={`${sectionBackground} py-16`}>
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
        <section className={`${sectionBackground} relative overflow-hidden py-16`}>
            {background === "gradient" && (
                <>
                    <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-yellow-300/30 blur-3xl" />
                    <div className="absolute bottom-12 right-10 h-40 w-40 rounded-full bg-yellow-500/20 blur-3xl" />
                    <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
                </>
            )}

            <div className="relative z-10 mb-12 flex justify-center">
                <div
                    className={`rounded-full px-16 py-3 shadow-lg ${background === "gradient"
                            ? "border border-yellow-300 bg-white"
                            : "bg-zinc-100"
                        }`}
                >
                    <h2
                        className={`text-sm font-bold tracking-[0.35em] ${background === "gradient"
                                ? "text-yellow-600"
                                : "text-black"
                            }`}
                    >
                        {title}
                    </h2>
                </div>
            </div>

            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 md:mx-auto md:grid md:max-w-6xl md:grid-cols-3 md:overflow-visible md:px-6"
            >
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`min-w-full snap-center md:min-w-0 ${background === "gradient" ? "animate-float" : ""
                            }`}
                        style={{
                            animationDelay: `${index * 0.18}s`,
                        }}
                    >
                        {background === "gradient" ? (
                            <div className="flex flex-col items-center">
                                <div className="relative z-20 w-full transition duration-300 hover:-translate-y-3">
                                    <div className="rounded-t-4xl border border-yellow-200 bg-white p-1 shadow-2xl shadow-yellow-900/20">
                                        <ProductCard product={product} />
                                    </div>
                                </div>

                                <div className="relative -mt-1 flex w-[82%] flex-col items-center">
                                    <div className="h-4 w-full rounded-t-lg bg-linear-to-r from-yellow-300 via-yellow-500 to-yellow-300 shadow-md" />
                                    <div className="h-24 w-[86%] bg-linear-to-b from-yellow-400 to-yellow-700 shadow-lg" />
                                    <div className="h-5 w-full rounded-b-lg bg-linear-to-r from-yellow-700 via-yellow-500 to-yellow-700 shadow-xl" />

                                    <div className="mt-2 h-3 w-[95%] rounded-full bg-black/20 blur-sm" />
                                </div>
                            </div>
                        ) : (
                            <ProductCard product={product} />
                        )}
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-4 flex justify-center gap-2 md:hidden">
                {products.map((product, index) => (
                    <button
                        key={product.id}
                        type="button"
                        onClick={() => goToProduct(index)}
                        className={`h-2 rounded-full transition-all ${activeProduct === index
                                ? "w-6 bg-yellow-500"
                                : "w-2 bg-zinc-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}