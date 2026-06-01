export function Modal({
    isOpen,
    title = "Confirmação",
    message,
    highlight,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    loading = false,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <section className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl">
                <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl font-bold text-yellow-600">
                        !
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900">
                            {title}
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                            {message}

                            {highlight && (
                                <span className="font-semibold text-yellow-500">
                                    {" "}
                                    {highlight}
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className="w-full rounded-full border border-zinc-300 py-2 text-sm font-semibold transition hover:bg-zinc-100 disabled:opacity-60"
                        >
                            {loading ? "Aguarde..." : confirmText}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="w-full rounded-full bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}