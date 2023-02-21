function createChart() {
    var mychart = document.getElementById("statChart").getContext("2d");

    var chart_options = {
        responsive: true,
        scales: {
            r: {
                pointLabels: {
                    display: false
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                    stepSize: 1,
                    max: 5
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    var chart_data = [1, 5, 3, 2, 4, 1];

    console.log("init chart");
    var round_graph = new Chart(mychart, {
        type: 'radar',
        data: {
            labels: ['Power', 'Potential', 'Precision', 'Speed', 'Range', 'Durability'],
            datasets: [{
                label: 'Ability Stats',
                data: chart_data,
                borderCapStyle: 'round',
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: chart_options
    });
}

async function alterMomentum(actId, modifier) {
    const act = game.actors.get(actId);

    var newMomentum = act.system['user-attributes']['momentum']['value'] + modifier;
    await act.update({ "system.user-attributes.momentum.value": newMomentum });
}

async function resetMomentum(actId, modifier) {
    const act = game.actors.get(actId);

    await act.update({ "system.user-attributes.momentum.value": 0 });
}