import Logo from "../../../assets/img/Logo_Lumos.png";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { IoCart } from "react-icons/io5";

export function HeaderLanding() {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-black px-5 py-4 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <figure className="order-1">
                    <img
                        src={Logo}
                        alt="Logo da Lumos"
                        className="h-10 w-auto object-contain md:h-12"
                    />
                </figure>

                <form className="order-3 flex w-full items-center border-b border-white md:order-2 md:w-105">
                    <button
                        type="submit"
                        className="text-white flex items-center gap-2 px-2 py-2 text-sm cursor-pointer"
                    >
                        Pesquisar
                        <FiSearch />
                    </button>

                    <input
                        type="text"
                        name="pesquisar"
                        id="input-pesquisar"
                        className="flex-1 bg-transparent border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 text-white placeholder:text-zinc-400"
                    />
                </form>

                <div className="order-2 flex items-center gap-5 md:order-3 md:gap-10">
                    <button type="button" onClick={() => navigate("/carrinho")}>
                        <IoCart className="text-white text-2xl cursor-pointer" />
                    </button>

                    <a
                        href="/login"
                        className="text-white text-base font-medium cursor-pointer hover:text-zinc-300 transition md:text-lg"
                    >
                        Login
                    </a>
                </div>
            </div>
        </header>
    );
}