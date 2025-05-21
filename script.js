async function buscarTemperatura() {
    const cidade = document.getElementById("inputCidade").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!cidade) {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    resultadoDiv.textContent = "Carregando...";

    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?la=${encodeURIComponent(cidade)}`);
        const dados = await resposta.json();

        if (dados.error) {
            resultadoDiv.textContent = "Erro ao buscar dados.";
        } else {
            resultadoDiv.innerHTML = `
                A temperatura em <strong>${dados.cidade}</strong> é 
                <strong>${dados.temperatura}°C</strong>.
            `;
        }
    } catch (error) {
        console.error(error);
        resultadoDiv.textContent = "Erro na conexão.";
    }
}