export default class JJBA2eCharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/jojo-rpg/templates/standuser-sheet.hbs",
            classes: ["jjba2e", "sheet", "namedCharacter", "character-scripts"],
            width: 750,
            height: 810,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stand" }]
        });
    }

    get template() {
        console.log("getTemplate");
        console.log(this.getData());
        return "systems/jojo-rpg/templates/standuser-sheet.hbs";
    }

    /*render() {
        const context = super.render();

        console.log(context);
        const doc = context.form;

        console.log(doc);

        var mychart = doc.getElementById("statChart").getContext("2d");

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
    }*/

    activateListeners(html) {
        super.activateListeners(html);

        // Bind a click event to a button with the class "my-button"
        html.find('.inc-momentum').click((event) => {
            // Handle the click event
            alterMomentum(this.actor._id, 1);
        });

        html.find('.dec-momentum').click((event) => {
            // Handle the click event
            alterMomentum(this.actor._id, -1);
        });

        html.find('.res-momentum').click((event) => {
            // Handle the click event
            resetMomentum(this.actor._id);
        });

        html.find('.draw-chart').click((event) => {
            // Handle the click event
            createChart();
        });

        //window.addEventListener('load', createChart());
    }
}