const endPointCasaisEstilos = '/casais/estilos';
const coresCategoriasCasamentos = ['#EA8079', '#FFB854', '#DB5D79', '#84B8E2', '#68BFB7', '#E2645A', '#86D0CB'];
var datasetCompleto = [];


window.onload = function() {
    $('#chart-loading').scheletrone();

    obterDadosAPILejour(endPointCasaisEstilos, renderizarGraficoEstilosCasamentoPorTempo);
    
    ativaBotao('btn-ar-livre');
    ativaBotao('btn-urbano');
    ativaBotao('btn-a-dois');
    ativaBotao('btn-destination');
    ativaBotao('btn-mini-casamento');
    ativaBotao('btn-em-casa');
}

function trataDadosAPI(info) {
    let datasets = [];
    for(let i = 0; i < info.length; i++) {
        var data = {
            label: info[i].estilo,
            borderWidth: 4,
            backgroundColor: coresCategoriasCasamentos[i],
            borderColor: coresCategoriasCasamentos[i],
            data: info[i].dados.map((x) => x.quantidade),
            fill: false
        };
        datasets.push(data);
    }
    datasetCompleto = datasets.slice();
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


function ativaBotao(idBotao) {
    $('#' + idBotao).css('background-color', laranjaLejour);
}

function desativaBotao(idBotao) {
    $('#' + idBotao).css('background-color', azulCeuLejour);
}

function removeDataset(datasetLabel) {
    var chart = window.myBar;

    let idx = chart.config.data.datasets.findIndex(i => i.label.toLowerCase() == datasetLabel.toLowerCase());
    if(idx < 0) return;

    chart.config.data.datasets.splice(idx, 1);
    chart.update();
}

function addDataset(datasetLabel) {
    var chart = window.myBar;

    let idx = datasetCompleto.findIndex(i => i.label.toLowerCase() == datasetLabel.toLowerCase());
    if(idx < 0) return;

    chart.config.data.datasets.push(datasetCompleto[idx]);
    chart.update();
}

$('#btn-ar-livre').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Casamento ao ar livre');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Casamento ao ar livre')
    }
});

$('#btn-urbano').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Casamento na cidade');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Casamento na cidade')
    }
});

$('#btn-a-dois').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Casamento a Dois');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Casamento a Dois')
    }
});

$('#btn-destination').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Destination Wedding');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Destination Wedding')
    }
});

$('#btn-mini-casamento').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Mini Casamento');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Mini Casamento')
    }
});

$('#btn-em-casa').click(function() {
    var btn = $(`#${this.id}`);
    if(btn.attr('data-toggle') == 'true') {
        desativaBotao(this.id);
        btn.attr('data-toggle', 'false');
        removeDataset('Casamento em casa');
    }
    else {
        ativaBotao(this.id);
        btn.attr('data-toggle', 'true');
        addDataset('Casamento em casa')
    }
});
