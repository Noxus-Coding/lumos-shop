import Logo from "../../../assets/img/Logo_Lumos.png";
import { Link, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { IoCart } from "react-icons/io5";
import { useAuth } from "../../../contexts/authContext.jsx";

export function HeaderLanding() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="w-full bg-black px-5 py-4 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <figure className="order-1">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo da Lumos"
              className="h-10 w-auto object-contain md:h-12"
            />
          </Link>
        </figure>

        <form className="order-3 flex w-full items-center border-b border-white md:order-2 md:w-105">
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-white"
          >
            Pesquisar
            <FiSearch />
          </button>

          <input
            type="text"
            name="pesquisar"
            id="input-pesquisar"
            className="flex-1 border-0 bg-transparent text-white outline-none ring-0 placeholder:text-zinc-400 focus:border-0 focus:outline-none focus:ring-0"
          />
        </form>

        <div className="order-2 flex items-center gap-5 md:order-3 md:gap-8">
          <button type="button" onClick={() => navigate("/carrinho")}>
            <IoCart className="cursor-pointer text-2xl text-white" />
          </button>

          {isAuthenticated && isAdmin ? (
            <>
              <Link
                to="/admin/products"
                className="text-base font-medium text-white transition hover:text-zinc-300 md:text-lg"
              >
                Painel
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-base font-medium text-white transition hover:text-zinc-300 md:text-lg"
              >
                Sair
              </button>
            </>
          ) : isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-base font-medium text-white transition hover:text-zinc-300 md:text-lg"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer text-base font-medium text-white transition hover:text-zinc-300 md:text-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
