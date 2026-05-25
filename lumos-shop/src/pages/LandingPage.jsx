import Logo from "../assets/img/Logo_Lumos.png";
import Head from "../assets/img/Head.png";

import { FiSearch } from "react-icons/fi";
import { IoCart } from "react-icons/io5";
import { CategoryNav } from "../components/landing/CategoryNavbar";


export function LandingPage() {
    return (
        <>
            <header className="w-full bg-black px-10 py-4 flex items-center justify-between">
                <figure>
                    <img src={Logo} alt="Logo da Lumos" />
                </figure>

                <div className="flex border border-b-white">
                    <button className="text-white flex items-center gap-2 px-4 py-2 cursor-pointer">
                        Pesquisar
                        <FiSearch />
                    </button>

                    <input type="text" name="pesquisar" id="input-pesquisar" className="w-100 border-none outline-none text-white" />
                </div>

                <div className="flex gap-10">
                    <button>
                        <IoCart className="text-white text-2xl cursor-pointer" />
                    </button>
                    <a href="/login" className="text-white text-lg font-medium cursor-pointer">Login</a>
                </div>

            </header>

            <CategoryNav />

            <main className="w-full">
                <section>
                    <img
                        src={Head}
                        alt="Imagem de destaque da Lumos"
                        className="w-full h-auto object-cover"
                    />
                </section>
            </main>
        </>
    );
}