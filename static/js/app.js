// Plotly application to showcase my skills in creating engaging visualization and a web dashboard 
// Written by Jay Sueno

// Create the URL variable to be called in future server promise calls
var url = `./data/samples.json`

// READ/FETCH in the json file using "d3.json()" to test and console log
// We will use this process to access the data
d3.json(url).then(function(data) 
    {console.log("Data file READ from server:", data)}
);

// Call the dropdown function and console log that it's created
dropDownMenu(console.log('dropdown created'));

// Menu Bar - Option 1 append the dropdown menu to include all the names of the dataset using D3
// We will use the .append() function to the "<select></>" node to add new lines of "option" with values from the dataset
function dropDownMenu() {
    // FETCH the JSON data
    d3.json(url).then(function(data) {
        // Create an array variable to reference the names of the objects in dataset
        var idName = data.names;
        // The .forEach() will iterate through the array to append the menu items
        idName.forEach(name => {
            d3.select("#selDataset")
            .append("option")
            .attr("value", name)
            .text(name);
        })
    });
}

// Call the init() function to initialize the page with the first subject's data 
init()

// Create the init() function to handle all of the initial plots and meta data display
// Included
function init() {
    d3.json(url).then(function(data) {
        // Object.entries() to create an arrays of the initial subjects metadata and samples
        var subject = Object.entries(data.metadata[0]);
        var samples = Object.values(data.samples);
        console.log('inital subject metadata and samples data using Oject.entries():')
        console.log(subject);
        console.log(samples);
        // Create variables to hold the initial dataset to make plots
        var sample_values = samples[0].sample_values;
        var otu_ids = samples[0].otu_ids;
        var otu_labels = samples[0].otu_labels;

        // Bar chart plot creation of TRACE
        var trace1 = {
            // .slice() out the first 10 values
            x: sample_values.slice(0, 10),
            // .map() the names to create an array of OTU string names
            y: otu_ids.map(x => `OTU ${x}`),
            // .slice() out the first 10 names of the OTUs
            text: otu_labels.slice(0, 10),
            // Define the type of chart as "bar"
            type: "bar",
            // Orient the bars to be horizontal "h"
            orientation: "h"
        };
        
        // Create data array for plot
        var data1 = [trace1];
        
        // Define the plot layout
        var layout1 = {
            title: "Top 10 OTU Values",
            xaxis: {
                title: "Number of Values in Sample"
            },
            yaxis: {
                categoryorder: "total ascending"
            }
        };
    
        // Plot the chart to a div tag with id "bar" 
        // Include arrays: data1 and layout1
        Plotly.newPlot("bar", data1, layout1)

        // Bubble chart plot creation. Create trace.
        var trace2 = {
            // OTU ID will run along the xaxis and we will take the top 30
            x: otu_ids.slice(0,30),
            // Placement of bubble on yaxis uses the sample values
            y: sample_values.slice(0,30),
            mode: "markers",
            marker: {
                // Size of the bubble will be the sample value, we will take top 30
                size: sample_values.slice(0,30),
                // Associate color to the OTU IDs
                color: otu_ids
            },
            // Text pop-up as OTU lables, top 30
            text: otu_labels.slice(0,30)
        };

        // Create data array for plot
        var data2 = [trace2];

        // Define the plot layout
        var layout2 = {
            title: "OTUs in Test Subject's Belly Button",
            showlegend: false,
        };

        // Plot the bubble chart to a div tag with id "bubble" 
        // Include arrays: data2 and layout2
        Plotly.newPlot("bubble", data2, layout2);

        // Populate metadata card
        // Select the element and assign to a variable
        var card = d3.select(".card-title")

        // Use Object.entries() to break out the key and value of each object
        // Iterate through array with .forEach() 
        // Use an arrow function to append the text to include the key and value to info card
        Object.entries(data.metadata[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
        );
        console.log("subject object metadata")
        console.log(data.metadata[0]);

        // Gauge chart plot creation
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
    // Fetch data from server
    d3.json(url).then(function(data) {
        // Print out the id number chosen in console
        console.log(`selected ID num: ${newSelection}`)
        // Call all the functions to be updated when new selection is chosen
        updateBar(newSelection);
        updateBubble(newSelection);
        updateCard(newSelection);
        updateGauge(newSelection);

        // Bar plot update function
        function updateBar() {
            // Use .filter() function to pull data and asign to a variable the newly chosen Subject ID from dropdown menu
            var newSubject = data.samples.filter(x => x.id == newSelection);
            console.log(newSubject);
            console.log(newSubject[0].sample_values);
            
            // Define the updated x, y, and text values
            var x = newSubject[0].sample_values.slice(0, 10);
            var y = newSubject[0].otu_ids.map(x => `OTU ${x}`);
            var text = newSubject[0]. otu_labels.slice(0, 10);
            
            // Use .restyle() to save computer resources instead of newPlot()
            // define the chart to update "bar", the value name 'x', and the array[x]
            Plotly.restyle("bar", 'x', [x]);
            Plotly.restyle("bar", 'y', [y]);
            Plotly.restyle("bar", 'text', [text])
        }
        // Bubble plot update function similar to above
        function updateBubble() {
            var newSubject = data.samples.filter(x => x.id == newSelection);
            var x = newSubject[0].otu_ids.slice(0, 30);
            var y = newSubject[0].sample_values.slice(0, 30);
            var text = newSubject[0]. otu_labels.slice(0, 30);

            Plotly.restyle("bubble", 'x', [x]);
            Plotly.restyle("bubble", 'y', [y]);
            Plotly.restyle("bubble", 'text', [text])
        };

        // Gauge plot update function similar to above
        function updateGauge() {
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject[0].wfreq);
            var value = newSubject[0].wfreq;
            Plotly.restyle("gauge", "value", [value])
        }
        // Metadata card update function
        function updateCard() {
            // Use .filter() function to pull data and asign to a variable the newly chosen Subject ID from dropdown menu
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject);
            // Select the HTML element to update and CLEAR the text with .html("") to prevent text from compiling
            var card = d3.select(".card-title").html("");
            // Use object.entries and a forEach.() iteration to append the paragraph of the HTML node with text of keys and values
            Object.entries(newSubject[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
            )
        }
    });
};
