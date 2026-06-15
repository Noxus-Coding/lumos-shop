const prisma = require('../config/prisma.js');

async function createProduct({
    name,
    description,
    costPrice,
    price,
    stock,
    imageUrl,
    categoryId,
}) {
    if (!name) {
        throw new Error("Nome do produto é obrigatório");
    }

    if (costPrice === undefined || costPrice === null || costPrice === "") {
        throw new Error("Preço de custo do produto é obrigatório");
    }

    if (Number(costPrice) < 0) {
        throw new Error("Preço de custo inválido");
    }

    if (!price) {
        throw new Error("Preço de venda do produto é obrigatório");
    }

    if (Number(price) <= 0) {
        throw new Error("Preço de venda inválido");
    }

    if (stock === undefined || Number(stock) < 0) {
        throw new Error("Estoque do produto é obrigatório e deve ser um número não negativo");
    }

    let validCategoryId = null;

    if (categoryId) {
        const categoryExists = await prisma.category.findUnique({
            where: {
                id: Number(categoryId),
            },
        });

        if (!categoryExists) {
            throw new Error("Categoria não encontrada");
        }

        validCategoryId = Number(categoryId);
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            costPrice: Number(costPrice),
            price: Number(price),
            stock: Number(stock),
            imageUrl,
            categoryId: validCategoryId,
        },
        include: {
            category: true,
        },
    });

    return product;
}

async function listProducts({ categoryId, search, sort } = {}) {
    const where = {};
    let orderBy = {
        createdAt: "desc",
    };

    if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
        where.categoryId = Number(categoryId);
    }

    if (search !== undefined && search !== null && search.trim() !== "") {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    if (sort === "recent") {
        orderBy = {
            createdAt: "desc",
        };
    }

    if (sort === "price_asc") {
        orderBy = {
            price: "asc",
        };
    }

    if (sort === "price_desc") {
        orderBy = {
            price: "desc",
        };
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            category: true,
        },
        orderBy,
    });

    return products;
}

async function getProductById(id) {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            category: true,
        },
    });

    if (!product) {
        throw new Error("Produto não encontrado");
    }

    return product;
}

async function updateProduct(
    id,
    { name, description, costPrice, price, stock, imageUrl, categoryId }
) {
    const productExists = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!productExists) {
        throw new Error("Produto não encontrado");
    }

    if (name !== undefined && !name.trim()) {
        throw new Error("Nome do produto é obrigatório");
    }

    if (costPrice !== undefined && Number(costPrice) < 0) {
        throw new Error("Preço de custo inválido");
    }

    if (price !== undefined && Number(price) <= 0) {
        throw new Error("Preço de venda inválido");
    }

    if (stock !== undefined && Number(stock) < 0) {
        throw new Error("Estoque do produto é obrigatório e deve ser um número não negativo");
    }

    let validCategoryId = undefined;

    if (categoryId !== undefined) {
        if (categoryId === null || categoryId === "") {
            validCategoryId = null;
        } else {
            const categoryExists = await prisma.category.findUnique({
                where: {
                    id: Number(categoryId),
                },
            });

            if (!categoryExists) {
                throw new Error("Categoria não encontrada");
            }

            validCategoryId = Number(categoryId);
        }
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(costPrice !== undefined && { costPrice: Number(costPrice) }),
            ...(price !== undefined && { price: Number(price) }),
            ...(stock !== undefined && { stock: Number(stock) }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(categoryId !== undefined && { categoryId: validCategoryId }),
        },
        include: {
            category: true,
        },
    });

    return updatedProduct;
}

async function deleteProduct(id) {
    const productExists = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!productExists) {
        throw new Error("Produto não encontrado");
    }

    await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });

    return {
        message: "Produto excluído com sucesso",
    };
}

module.exports = {
    createProduct,
    listProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};