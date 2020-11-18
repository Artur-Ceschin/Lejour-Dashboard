const endPointCasaisEstilos = '/casais/estilos';
const coresCategoriasCasamentos = ['#EA8079', '#FFB854', '#DB5D79', '#84B8E2', '#68BFB7', '#E2645A', '#86D0CB'];

window.onload = function() {
    $('#chart-loading').scheletrone();

    obterDadosAPILejour(endPointCasaisEstilos, renderizarGraficoEstilosCasamentoPorTempo);
    
}

function trataDadosAPI(info) {
    let datasets = [];
    for(let i = 0; i < info.length; i++) {
        datasets.push({
            label: info[i].estilo,
            borderWidth: 5,
            backgroundColor: coresCategoriasCasamentos[i],
            borderColor: coresCategoriasCasamentos[i],
            data: info[i].dados.map((x) => x.quantidade),
            fill: false
        })
    }
    return datasets;
}


function renderizarGraficoEstilosCasamentoPorTempo(data) {
    $('#chart-loading').addClass('d-none');
    
    var obtemDadosTratados = trataDadosAPI(data);

    var barChartData = {
        labels: data[0].dados.map(x => x.mes_ano),
        datasets: obtemDadosTratados
    };

    var canvas = document.getElementById('estiloCasamentoVsTempo');
    var ctx = canvas.getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'line',
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
    $('#chart-loading').removeClass('d-none');

    obterDadosAPILejour(endPointCasaisOrcamento, renderizarGraficoCasamentosVsOrcamento, queryParams);
}