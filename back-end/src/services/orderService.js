const prisma = require("../config/prisma");

async function createOrder({ customerName, phone, address, items }) {
    if (!customerName) {
        throw new Error("Nome do cliente é obrigatório");
    }

    if (!phone) {
        throw new Error("Telefone do cliente é obrigatório");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("O pedido precisa ter pelo menos um produto");
    }

    const productIds = items.map((item) => Number(item.productId));

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });

    if (products.length !== productIds.length) {
        throw new Error("Um ou mais produtos não foram encontrados");
    }

    let total = 0;

    const orderItemsData = items.map((item) => {
        const product = products.find(
            (product) => product.id === Number(item.productId)
        );

        const quantity = Number(item.quantity);

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        if (!quantity || quantity <= 0) {
            throw new Error("Quantidade inválida");
        }

        if (product.stock < quantity) {
            throw new Error(`Estoque insuficiente para o produto ${product.name}`);
        }

        total += Number(product.price) * quantity;

        return {
            productId: product.id,
            quantity,
            price: Number(product.price),
        };
    });

    const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
            data: {
                customerName,
                phone,
                address,
                total,
                status: "EM_SEPARACAO",
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        for (const item of items) {
            await tx.product.update({
                where: {
                    id: Number(item.productId),
                },
                data: {
                    stock: {
                        decrement: Number(item.quantity),
                    },
                },
            });
        }

        return createdOrder;
    });

    return order;
}

async function listOrders({ status } = {}) {
    const where = {};

    if (status) {
        where.status = status;
    }

    const orders = await prisma.order.findMany({
        where,
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return orders;
}

async function getOrderById(id) {
    const order = await prisma.order.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Pedido não encontrado");
    }

    return order;
}

async function updateOrderStatus(id, { status }) {
    const allowedStatus = ["EM_SEPARACAO", "ENVIADO", "CANCELADO"];

    if (!allowedStatus.includes(status)) {
        throw new Error("Status inválido");
    }

    const orderExists = await prisma.order.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!orderExists) {
        throw new Error("Pedido não encontrado");
    }

    const order = await prisma.order.update({
        where: {
            id: Number(id),
        },
        data: {
            status,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return order;
}

module.exports = {
    createOrder,
    listOrders,
    getOrderById,
    updateOrderStatus,
};