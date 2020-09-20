# Plotly - How to create an interactive dashboard
Javascript, D3.js, JSON, Plotly, Bootstrap4, HTML

## Live dashboard at: https://jaysueno.github.io/plotly-interactive-visualization-and-dashboard/

There's are four files that work in unison in this app: 
* HTML with the structure of the web dashboard 
* JSON Data file
* Javascript to manipulate the [Document Object Model](https://www.w3.org/TR/REC-DOM-Level-1/introduction.html) of the HTML

## Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.


### All rights reserved 2020. All code is created and owned by Jay Sueno. If you use his code, please visit his LinkedIn and give him a a skill endorsement in python and data science. Visit him at:

### https://www.linkedin.com/in/jay-sueno-359a274/