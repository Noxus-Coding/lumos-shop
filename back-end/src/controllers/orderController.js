const orderService = require("../services/orderService");

async function create(req, res) {
    try {
        const order = await orderService.createOrder(req.body);

        return res.status(201).json(order);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao criar pedido",
            error: error.message,
        });
    }
}

async function index(req, res) {
    try {
        const orders = await orderService.listOrders(req.query);

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar pedidos",
            error: error.message,
        });
    }
}

async function show(req, res) {
    try {
        const order = await orderService.getOrderById(req.params.id);

        return res.status(200).json(order);
    } catch (error) {
        return res.status(404).json({
            message: "Erro ao buscar pedido",
            error: error.message,
        });
    }
}

async function updateStatus(req, res) {
    try {
        const order = await orderService.updateOrderStatus(
            req.params.id,
            req.body
        );

        return res.status(200).json(order);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar status do pedido",
            error: error.message,
        });
    }
}

module.exports = {
    create,
    index,
    show,
    updateStatus,
};