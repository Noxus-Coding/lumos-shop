function adminMiddleware(req, res, next) {
    if (req.userRole !== "ADMIN") {
        return res.status(403).json({
            message: "Acesso negado. Apenas administradores podem acessar esta rota.",
        });
    }

    return next();
}

module.exports = adminMiddleware;