const dashboardService = require("../services/dashboardService.js");

async function show(req, res) {
    try {
        const dashboardData = await dashboardService.getDashboardData();

        return res.status(200).json(dashboardData);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao carregar dados do dashboard",
            error: error.message,
        });
    }
}

module.exports = {
    show,
};