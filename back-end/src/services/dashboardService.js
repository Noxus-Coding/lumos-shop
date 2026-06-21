const prisma = require("../config/prisma.js");

async function getDashboardData() {
    const orders = await prisma.order.findMany({
        where: {
            status: {
                not: "CANCELADO",
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

    const totalSales = orders.length;

    const totalRevenue = orders.reduce((sum, order) => {
        return sum + Number(order.total);
    }, 0);

    const paidOrders = orders.filter((order) => order.paymentStatus === "PAGO");

    const openOrders = orders.filter(
        (order) => order.paymentStatus === "PENDENTE"
    );

    const receivedValue = paidOrders.reduce((sum, order) => {
        return sum + Number(order.total);
    }, 0);

    const valueToReceive = openOrders.reduce((sum, order) => {
        return sum + Number(order.total);
    }, 0);

    const estimatedProfit = orders.reduce((profitSum, order) => {
        const orderProfit = order.items.reduce((itemSum, item) => {
            const salePrice = Number(item.price);
            const costPrice = Number(item.product.costPrice || 0);
            const quantity = Number(item.quantity);

            return itemSum + (salePrice - costPrice) * quantity;
        }, 0);

        return profitSum + orderProfit;
    }, 0);

    const paidSales = paidOrders.length;

    const openSales = openOrders.length;

    return {
        totalSales,
        totalRevenue,
        receivedValue,
        valueToReceive,
        paidSales,
        openSales,
        estimatedProfit,
    };
}

module.exports = {
    getDashboardData,
};