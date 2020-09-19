// Plotly application to showcase my skills in creating engaging visualization and a web dashboard 
// Written by Jay Sueno

// read in the json file using "d3.json()" and assign to a variable to be able to call later
var dataFile = d3.json("../data/samples.json").then(function(data) 
    {console.log("json data file read", data)});
d3.json("../data/samples.json").then(function(data){
    console.log(data.names)
})


// optionChanged() is a function in the drop down dial box
// id for listener ".selDataset"

// create a listener for the dropdown menue and assign it a variable for future use
var dropDown = d3.select("#selDataset");
// create a variable to reference the names of the datasets
// this create an array of the names values from the json object
var idName = data.names;
// append the dropdown menu to include all the names of the dataset using D3
// we will use the .append() function to the "<select></>" node
// d3.json("../data/samples.json").then(function(data) {
//     // create a variable to reference the names of the datasets
//     // this create an array of the names values from the json object
//     var idName = data.names;
//     idName.forEach(name => {
//         dropDown.append("option")
//         .attr("value", name)
//         .text(name);
//     console.log(idName);
//     })
// });

//this could also be done using the d3 methods .selectAll() .data() and .enter()
d3.json("../data/samples.json").then(function(data) {
    var idName = data.names;
    dropDown.selectAll("option")
        .data(idName)
        .enter()
        .append("option")
        // we map the data that's already merged and pull out each item directly 
        .attr("value", (i) => i)
        .text(i => i);
});

// create the bar chart with the selected dataset
// initialize the dashboard with preloaded data
function init() {
    var trace = {
        // we need to iterate through an array of objects within a list of objects
        x: 
    };
}

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id (or name)
 * index 1 - otu_ids (array)
 * index 2 - otu_labels (array)
 * index 3 - sample_values (array)
 * index 4 - Close
 * index 5 - Volume
 */

// we will also need to use a filter function using the unpack function to match the #selDataset with "id"

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

