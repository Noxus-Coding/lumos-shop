const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const parts = authHeader.trim().split(/\s+/);

  if (parts.length !== 2) {
    return res.status(401).json({
      message: "Token mal formatado",
    });
  }

  const [scheme, token] = parts;

  if (scheme.toLowerCase() !== "bearer") {
    return res.status(401).json({
      message: "Formato de token inválido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userEmail = decoded.email;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}

module.exports = authMiddleware;