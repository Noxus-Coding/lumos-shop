const API_URL = "http://localhost:3000";

function formatarDinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function mostrarErro(mensagem) {
  const erro = document.getElementById("erro-dashboard");

  erro.textContent = mensagem;
  erro.style.display = "block";
}

function esconderErro() {
  const erro = document.getElementById("erro-dashboard");

  erro.textContent = "";
  erro.style.display = "none";
}

function preencherDashboard(dados) {
  document.getElementById("total-vendas").textContent = dados.totalSales || 0;

  document.getElementById("faturamento").textContent = formatarDinheiro(
    dados.totalRevenue,
  );

  document.getElementById("valor-recebido").textContent = formatarDinheiro(
    dados.receivedValue,
  );

  document.getElementById("valor-receber").textContent = formatarDinheiro(
    dados.valueToReceive,
  );

  document.getElementById("vendas-pagas").textContent = dados.paidSales || 0;

  document.getElementById("vendas-abertas").textContent = dados.openSales || 0;

  document.getElementById("lucro-estimado").textContent = formatarDinheiro(
    dados.estimatedProfit,
  );
}

async function carregarDashboard() {
  try {
    esconderErro();

    const token = localStorage.getItem("token");

    if (!token) {
      mostrarErro("Você precisa estar logado como administrador.");
      return;
    }

    const resposta = await fetch(`${API_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resposta.status === 401 || resposta.status === 403) {
      mostrarErro("Acesso negado. Faça login novamente como administrador.");
      return;
    }

    if (!resposta.ok) {
      mostrarErro("Erro ao carregar dados do dashboard.");
      return;
    }

    const dados = await resposta.json();

    preencherDashboard(dados);
  } catch (error) {
    console.log(error);
    mostrarErro("Não foi possível conectar ao backend.");
  }
}

carregarDashboard();
