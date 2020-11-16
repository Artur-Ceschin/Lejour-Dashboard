const endPointFornecedoresRanking = '/fornecedores/ranking';
const endPointFornecedoresInvoices = '/fornecedores/invoices';

window.onload = function() {
    obterDadosAPILejour(endPointFornecedoresRanking, renderizarGraficoCategoriaVsFatura);
    obterDadosAPILejour(endPointFornecedoresInvoices, renderizarGraficoAgendamentoVsFatura);
}


function renderizarGraficoCategoriaVsFatura(data) {

    var titulos = data.map((x) => x.categoria);
    var dadosFornecedores = data.map((x) => x.negocios_fechados);

    var barChartData = {
        labels: titulos,
        datasets: [{
            label: "Fornecedores/Categoria",
            borderWidth: 1,
            data: dadosFornecedores,
            backgroundColor: laranjaLejour,
            hoverBackgroundColor: goiabaLejour
        }]
    };

    var chartContainer = $('#faturamentoPorCategoriaFornecedorGrafico');
    chartContainer.css('height', '500px');

    var ctx = document.getElementById('faturamentoPorCategoriaFornecedorGrafico').getContext('2d');
    window.myBar1 = new Chart(ctx, {
        type: 'horizontalBar',
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
            maintainAspectRatio: true
        }
    });


}

function renderizarGraficoAgendamentoVsFatura(data) {

    var titulos = data.map((x) => x.categoria);
    var dadosAgendamentos = data.map((x) => x.agendamentos_realizados);
    var dadosInvoicesAceitas = data.map((x) => x.negocios_fechados);

    var barChartData = {
        labels: titulos,
        datasets: [{
            label: "Agendamentos",
            borderWidth: 1,
            data: dadosAgendamentos,
            backgroundColor: laranjaLejour,
            hoverBackgroundColor: goiabaLejour
        },
        {
            label: "Invoices",
            borderWidth: 1,
            data: dadosInvoicesAceitas,
            backgroundColor: azulCeuLejour,
            hoverBackgroundColor: verdeAguaEscuroLejour
        }]
    };

    let ctx = document.getElementById('agendamentosVsFaturasGrafico').getContext('2d');
    window.myBar2 = new Chart(ctx, {
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
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

function filtrarGraficoCategoriaVsFatura(queryParams) {
    myBar1.destroy();

    obterDadosAPILejour(endPointFornecedoresRanking, renderizarGraficoCategoriaVsFatura, queryParams);
}

function filtrarGraficoAgendamentoVsFatura(queryParams) {
    myBar2.destroy();

    obterDadosAPILejour(endPointFornecedoresInvoices, renderizarGraficoAgendamentoVsFatura, queryParams);
}