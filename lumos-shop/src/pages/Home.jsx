import { useAuth } from "../contexts/authContext";

export function Home() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Página protegida
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Você está logado com autenticação JWT.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Dados do usuário
          </h2>

          {user ? (
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>E-mail:</strong> {user.email}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Nenhum usuário carregado.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}