const prisma = require("../config/prisma");

async function createCategory({ name }) {
  if (!name || String(name).trim() === "") {
    throw new Error("Nome da categoria é obrigatório");
  }

  const categoryExists = await prisma.category.findUnique({
    where: {
      name: String(name).trim(),
    },
  });

  if (categoryExists) {
    throw new Error("Categoria já cadastrada");
  }

  const category = await prisma.category.create({
    data: {
      name: String(name).trim(),
    },
  });

  return category;
}

async function listCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return categories;
}

async function getCategoryById(id) {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  return category;
}

async function updateCategory(id, { name }) {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!categoryExists) {
    throw new Error("Categoria não encontrada");
  }

  if (!name || String(name).trim() === "") {
    throw new Error("Nome da categoria é obrigatório");
  }

  const categoryNameExists = await prisma.category.findFirst({
    where: {
      name: String(name).trim(),
      NOT: {
        id: Number(id),
      },
    },
  });

  if (categoryNameExists) {
    throw new Error("Já existe uma categoria com esse nome");
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(name).trim(),
    },
  });

  return updatedCategory;
}

async function deleteCategory(id) {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      products: true,
    },
  });

  if (!categoryExists) {
    throw new Error("Categoria não encontrada");
  }

  if (categoryExists.products.length > 0) {
    throw new Error("Não é possível excluir uma categoria que possui produtos vinculados");
  }

  await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Categoria excluída com sucesso",
  };
}

module.exports = {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};