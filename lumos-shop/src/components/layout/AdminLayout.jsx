import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBox,
  FiShoppingBag,
  FiHome,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2,
} from "react-icons/fi";
import { useAuth } from "../../contexts/authContext.jsx";

export function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const linkBase =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";

  const linkInactive = "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950";

  const linkActive = "bg-yellow-500 text-white shadow-sm";

  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-zinc-200 bg-white px-5 py-6 md:block">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-950">Lumos</h1>

            <p className="mt-1 text-sm text-zinc-500">Painel administrativo</p>
          </div>

          <nav className="flex flex-col gap-2">
            <a
              href="/dashboard-demo/Dashboard.html"
              className={`${linkBase} ${linkInactive}`}
            >
              <FiBarChart2 />
              Dashboard
            </a>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <FiBox />
              Produtos
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <FiShoppingBag />
              Pedidos
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <FiBox />
              Categorias
            </NavLink>

            <Link to="/" className={`${linkBase} ${linkInactive}`}>
              <FiHome />
              Ver loja
            </Link>
          </nav>

          <div className="mt-10 border-t border-zinc-200 pt-5">
            <p className="text-xs text-zinc-500">Logado como</p>

            <p className="mt-1 text-sm font-semibold text-zinc-900">
              {user?.name || "Administrador"}
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
            >
              <FiLogOut />
              Sair
            </button>
          </div>
        </aside>

        <section className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-5 py-4 md:hidden">
            <div>
              <h1 className="text-xl font-bold text-zinc-950">Lumos</h1>
              <p className="text-xs text-zinc-500">Painel administrativo</p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-zinc-300 p-2 text-zinc-800 transition hover:bg-zinc-100"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>

          {menuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <button
                type="button"
                onClick={closeMenu}
                className="absolute inset-0 bg-black/40"
              />

              <aside className="relative z-10 h-full w-72 bg-white px-5 py-6 shadow-xl">
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-zinc-950">Lumos</h1>

                    <p className="mt-1 text-sm text-zinc-500">
                      Painel administrativo
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="rounded-full border border-zinc-300 p-2 text-zinc-700 transition hover:bg-zinc-100"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  <a
                    href="/dashboard-demo/Dashboard.html"
                    onClick={closeMenu}
                    className={`${linkBase} ${linkInactive}`}
                  >
                    <FiBarChart2 />
                    Dashboard
                  </a>

                  <NavLink
                    to="/admin/products"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : linkInactive}`
                    }
                  >
                    <FiBox />
                    Produtos
                  </NavLink>

                  <NavLink
                    to="/admin/orders"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : linkInactive}`
                    }
                  >
                    <FiShoppingBag />
                    Pedidos
                  </NavLink>

                  <NavLink
                    to="/admin/categories"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : linkInactive}`
                    }
                  >
                    <FiBox />
                    Categorias
                  </NavLink>

                  <Link
                    to="/"
                    onClick={closeMenu}
                    className={`${linkBase} ${linkInactive}`}
                  >
                    <FiHome />
                    Ver loja
                  </Link>
                </nav>

                <div className="mt-10 border-t border-zinc-200 pt-5">
                  <p className="text-xs text-zinc-500">Logado como</p>

                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    {user?.name || "Administrador"}
                  </p>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
                  >
                    <FiLogOut />
                    Sair
                  </button>
                </div>
              </aside>
            </div>
          )}

          <div className="flex-1 p-4 md:p-8">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}
