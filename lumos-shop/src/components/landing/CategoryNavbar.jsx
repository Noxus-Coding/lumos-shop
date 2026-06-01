export function CategoryNav({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <div className="w-full">
      <nav className="w-full border-y border-zinc-200 bg-zinc-50">
        <div className="flex overflow-x-auto">
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={`min-w-max border-r border-zinc-200 px-8 py-4 text-sm font-medium transition ${selectedCategoryId === null
                ? "bg-zinc-200 text-black"
                : "text-zinc-700 hover:bg-white hover:text-black"
              }`}
          >
            Tudo
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`min-w-max border-r border-zinc-200 px-8 py-4 text-sm font-medium transition ${selectedCategoryId === category.id
                  ? "bg-zinc-200 text-black"
                  : "text-zinc-700 hover:bg-white hover:text-black"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-zinc-200 bg-white py-2 text-center">
        <span className="text-xs tracking-[0.45em] text-zinc-500">
          Joias em Prata 925
        </span>
      </div>
    </div>
  );
}