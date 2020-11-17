const endPointCasaisEstilos = '/casais/estilos';

window.onload = function() {
    $('#chart-loading').scheletrone();

    renderizarGraficoEstilosCasamentoPorTempo([
        {
            estilo: 'Casamento no campo',
            dados: [
                {
                    mes_ano: 'Janeiro/2019',
                    quantidade: 10
                },
                {
                    mes_ano: 'Fevereiro/2019',
                    quantidade: 29
                },
                {
                    mes_ano: 'Março/2019',
                    quantidade: 20
                },
                {
                    mes_ano: 'Abril/2019',
                    quantidade: 15
                },
            ]
        },
        {
            estilo: 'Casamento na cidade',
            dados: [
                {
                    mes_ano: 'Janeiro/2019',
                    quantidade: 35
                },
                {
                    mes_ano: 'Fevereiro/2019',
                    quantidade: 10
                },
                {
                    mes_ano: 'Março/2019',
                    quantidade: 5
                },
                {
                    mes_ano: 'Abril/2019',
                    quantidade: 16
                },
            ]
        }
    ]);
}

function trataDadosAPI(info) {
    let datasets = [];
    console.log(info);
    for(let i = 0; i < info.length; i++) {
        console.log(info[0]);

        datasets.push({
            label: info[i].estilo,
            borderWidth: 5,
            backgroundColor: laranjaLejour,
            borderColor: laranjaLejour,
            data: info[i].dados.map((x) => x.quantidade),
            fill: false
        })
    }
    return datasets;
}


function renderizarGraficoEstilosCasamentoPorTempo(data) {
    $('#chart-loading').addClass('d-none');
    
    var obtemDadosTratados = trataDadosAPI(data);
    console.log(obtemDadosTratados);

    var barChartData = {
        labels: ['Janeiro/2019', 'Janeiro/2019', 'Janeiro/2019', 'Janeiro/2019'],
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