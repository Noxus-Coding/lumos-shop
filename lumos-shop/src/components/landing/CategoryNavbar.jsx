const categories = [
  "Tudo",
  "Brincos ponto de luz",
  "Brincos básicos",
  "Duplas",
  "Brincos cravejados",
  "Piercing",
  "Argolas",
  "Pulseiras",
  "Colares",
  "Conjuntos",
  "Escapulário",
];

export function CategoryNav() {
  return (
    <div className="w-full">
      <nav className="w-full flex justify-center items-center border-y border-slate-200 bg-slate-50">
        <div className="flex overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`
                min-w-max border-r border-slate-200 px-8 py-5 text-sm font-medium text-slate-700 transition
                hover:bg-white hover:text-slate-950
                ${index === 0 ? "bg-slate-200 text-slate-950" : ""}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-slate-200 bg-white py-2 text-center">
        <span className="text-xs tracking-[0.45em] text-slate-500">
          Joias em Prata 925
        </span>
      </div>
    </div>
  );
}