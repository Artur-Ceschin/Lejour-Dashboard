const endPointCasaisChurn = '/casais/churn';
const endPointCasaisOrcamento = '/casais/orcamento';

window.onload = function() {
    $('#tabela-churn').scheletrone();
    $('#chart-loading').scheletrone();

    obterDadosAPILejour(endPointCasaisChurn, carregarTabelaChurn);
    obterDadosAPILejour(endPointCasaisOrcamento, renderizarGraficoCasamentosVsOrcamento);

}

function criarLinhaTabela(id, data) {
    var button = $('<button></button>')
        .addClass(['btn', 'btn-block', 'd-flex', 'justify-content-between', 'button-color', 'mt-3', 'align']);
    
    var p1 = $('<p></p>').text('ID:' + id);
    var p2 = $('<p></p>').text(data);

    button.append(p1);
    button.append(p2);

    var tabelaChurn = $('#tabela-churn');
    tabelaChurn.prepend(button);
}

function carregarTabelaChurn(dadosChurn) {
    $('#tabela-churn').empty();

    for(let i = 0; i < 4; i++) {
        criarLinhaTabela(dadosChurn[i].id_usuario, dadosChurn[i].data_casamento);
    }
    $('#total-churn').text(dadosChurn.length);
}

function renderizarGraficoCasamentosVsOrcamento(data) {
    $('#chart-loading').remove();

    var titulos = data.map((x) => x.faixa_valor);
    var dadosCasamentos = data.map((x) => x.quantidade_casamentos);
    
    var barChartData = {
        labels: titulos,
        datasets: [{
            label: "Casamentos",
            borderWidth: 1,
            data: dadosCasamentos,
            backgroundColor: laranjaLejour,
            hoverBackgroundColor: goiabaLejour
        }]
    };

    var canvas = document.getElementById('casamentoVsOrcamentoGrafico');
    var ctx = canvas.getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            },
            maintainAspectRatio: false
        }
    });
}

function filtrarGraficoCasamentoVsOrcamentoData(queryParams) {
    window.myBar.destroy();

    obterDadosAPILejour(endPointCasaisOrcamento, renderizarGraficoCasamentosVsOrcamento, queryParams);
}