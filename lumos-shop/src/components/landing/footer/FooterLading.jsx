import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../../assets/img/Logo_Lumos.png";

export function FooterLanding() {
    return (
        <footer className="bg-black text-white">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                    
                    <figure>
                        <img src={Logo} alt="Lumos Pratas" />
                    </figure>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        Joias em Prata 925 pensadas para iluminar momentos
                        especiais com delicadeza, significado e elegância.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                        Navegação
                    </h3>

                    <nav className="mt-4 flex flex-col gap-2 text-sm text-zinc-400">
                        <Link to="/" className="transition hover:text-white">
                            Início
                        </Link>

                        <Link to="/carrinho" className="transition hover:text-white">
                            Carrinho
                        </Link>

                        <Link to="/login" className="transition hover:text-white">
                            Login
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                        Atendimento
                    </h3>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-400">
                        <p>Envio para todo o Brasil</p>
                        <p>Peças em Prata 925</p>
                        <p>Produtos sob encomenda</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                        Contato
                    </h3>

                    <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                        <a
                            href="https://instagram.com/lumospratas"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaInstagram className="text-lg text-yellow-500" />
                            Instagram
                        </a>

                        <a
                            href="https://wa.me/5588999999999"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaWhatsapp className="text-lg text-yellow-500" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <section className="border-t border-zinc-800 px-6 py-5">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-zinc-500 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} Lumos Pratas. Todos os direitos reservados.
                    </p>

                    <p>
                        Desenvolvido para o projeto Lumos Shop.
                    </p>
                </div>
            </section>
        </footer>
    );
}