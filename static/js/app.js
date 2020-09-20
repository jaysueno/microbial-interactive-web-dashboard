// Plotly application to showcase my skills in creating engaging visualization and a web dashboard 
// Written by Jay Sueno

// Create the URL variable to be called in future server promise calls
var url = `./data/samples.json`

// Read in the json file using "d3.json()" and assign to a variable to be able to call later
var dataFile = d3.json(url).then(function(data) 
    {console.log("json data file read", data)}
);

// Menu Bar - Option 1 append the dropdown menu to include all the names of the dataset using D3
// We will use the .append() function to the "<select></>" node
function dropDownMenu() {
    d3.json(url).then(function(data) {
        // Create a variable to reference the names of the datasets
        // this create an array of the name values from the json object
        var idName = data.names;
        idName.forEach(name => {
            d3.select("#selDataset")
            .append("option")
            .attr("value", name)
            .text(name);
        })
    });
}

// Call the dropdown function
dropDownMenu(console.log('dropdown created'));

// Menu Bar - Option 2: use d3 methods .selectAll() .data() and .enter()
// var menuBar = function() {
//     d3.json(url).then(function(data) {
//         var idName = data.names;
//         dropDown.selectAll("option")
//             .data(idName)
//             .enter()
//             .append("option")
//             // we map the data that's already merged and pull out each item directly 
//             .attr("value", (i) => i)
//             .text(i => i)
//     });
// }
    // pull init values out for bar chart, bubble, and meta data
    // use .reverse() to sort the values

init()

function init() {
    d3.json(url).then(function(data) {
        // Create an array of the initial subjects metadata and call update function to fill in information
        var subject = Object.entries(data.metadata[0]);
        console.log(subject);
        var samples = Object.values(data.samples);
        // Create variables to hold the initial dataset to make plots
        var sample_values = samples[0].sample_values;
        var otu_ids = samples[0].otu_ids;
        var otu_labels = samples[0].otu_labels;
        // console.log(sample_values, otu_ids, otu_labels); 

        var trace1 = {
            x: sample_values.slice(0, 10),
            y: otu_ids.map(x => `OTU ${x}`),
            text: otu_labels.slice(0, 10),
            // name: "otu values",
            type: "bar",
            orientation: "h"
        };
    
        var data1 = [trace1];
    
        var layout1 = {
            title: "Top 10 OTU Values",
            xaxis: {
                title: "Number of Values in Sample"
            },
            yaxis: {
                categoryorder: "total ascending"
            }
        };
    
        Plotly.newPlot("bar", data1, layout1)

        var trace2 = {
            x: otu_ids.slice(0,30),
            y: sample_values.slice(0,30),
            mode: "markers",
            marker: {
                size: sample_values.slice(0,30),
                color: otu_ids
            },
            text: otu_labels.slice(0,30)
        };

        var data2 = [trace2];

        var layout2 = {
            title: "OTUs in Test Subject's Belly Button",
            showlegend: false,
            // height: 600,
            // width: 1200
        };

        Plotly.newPlot("bubble", data2, layout2);

        var card = d3.select(".card-title")
        Object.entries(data.metadata[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
        );
        console.log(data.metadata[0]);

        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.metadata[6].wfreq,
                title: { text: "Wash Per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    // Set to axis to between 0 and 9 washes per week
                    axis: {range: [0, 9] },
                }
            }
        ];
        console.log(data.metadata[6].wfreq)
        var layout3 = { width: 500, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data3);
    })
}

// Define the optionChanged() function
// We do not need to create an EVENT LISTENER because it's already in the HTML <select> node as 'onchange="optionChanged, this.value"'
// This will act as an aggregator function that will call 4 different functions define below
function optionChanged(newSelection) {
    d3.json(url).then(function(data) {
        console.log(`selected ID num: ${newSelection}`)
        updateBar(newSelection);
        updateBubble(newSelection);
        updateCard();
        updateGauge()

        function updateBar() {
            var newSubject = data.samples.filter(x => x.id == newSelection);
            console.log(newSubject);
            console.log(newSubject[0].sample_values);
            
            var x = newSubject[0].sample_values.slice(0, 10);
            var y = newSubject[0].otu_ids.map(x => `OTU ${x}`);
            var text = newSubject[0]. otu_labels.slice(0, 10);
            
            Plotly.restyle("bar", 'x', [x]);
            Plotly.restyle("bar", 'y', [y]);
            Plotly.restyle("bar", 'text', [text])
        }
        
        function updateBubble() {
            var newSubject = data.samples.filter(x => x.id == newSelection);
            var x = newSubject[0].otu_ids.slice(0, 30);
            var y = newSubject[0].sample_values.slice(0, 30);
            var text = newSubject[0]. otu_labels.slice(0, 30);

            Plotly.restyle("bubble", 'x', [x]);
            Plotly.restyle("bubble", 'y', [y]);
            Plotly.restyle("bubble", 'text', [text])
        };

        function updateCard() {
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject);
            var card = d3.select(".card-title").html("");
            Object.entries(newSubject[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
            )
        }

        function updateGauge() {
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject[0].wfreq);
            var value = newSubject[0].wfreq;
            Plotly.restyle("gauge", "value", [value])
        }
    });
};
