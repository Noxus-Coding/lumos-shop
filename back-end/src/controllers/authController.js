const authService = require("../services/authService");

async function register(req, res) {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      user,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const data = await authService.login(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

async function me(req, res) {
  try {
    const user = await authService.me(req.userId);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

module.exports = {
  register,
  login,
  me,
};
