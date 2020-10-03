// Get the path of the data file and store into a variable
var sampleData = "./data/samples.json"

// Fetch the JSON data and print it on the console
d3.json(sampleData).then(function (data) {    
    console.log(data);
    data.names.forEach(name => { name
        console.log(`name:  ${name}`);
        d3.select("#selDataset")
            .append("option")
            .text(name)
    });
});

//Function to plot Bar Plots
function getbarPlots(id){
    d3.json(sampleData).then (sampledata =>{
        var resultDatab = sampledata.samples.filter(data => data.id === id)[0];
        var sampleValues =  resultDatab.sample_values.slice(0,10).reverse();
        var labels =  resultDatab.otu_labels.slice(0,10);
     // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = resultDatab.otu_ids.slice(0, 10).reverse();
     // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
      // get the top 10 labels for the plot
        var labels =  resultDatab.otu_labels.slice(0,10);
        var trace = {
             x: sampleValues,
             y: OTU_id,
             text: labels,
             marker: {
             color: 'blue'},
             type:"bar",
             orientation: "h",
        };
         // create data variable
        var data = [trace]
 
         // create layout variable to set plots layout
        var layout = {
             title: "Top 10 OTU",
             yaxis:{
                 tickmode:"linear",
             },
             margin: {
                 l: 100,
                 r: 100,
                 t: 100,
                 b: 30
             }
            }
        //Create Bar chart using Plotly
        Plotly.newPlot("bar", data, layout);

    });
    };

    //Function to plot pie chart
function getpiePlots(id){
    d3.json(sampleData).then((sampledata) =>{
        var resultDatap = sampledata.samples.filter(data => data.id === id)[0];
        var samplevalues=resultDatap.sample_values.slice(0,10).reverse();
        var otuids=resultDatap.otu_ids.slice(0,10).reverse();
        var trace = {
            values: samplevalues,
            labels: otuids,
            mode:"pie",
            marker: {
                size:samplevalues,
                color: otuids},
            type:"pie"
        };
        // create data variable
        var data = [trace]

        // create layout variable to set plots layout
        var layout = {
            title: "Pie Chart of top 10 OTU Ids"
        }
        // Create pie plot using plotly
        Plotly.newPlot("pie", data, layout);
    });
};

//Function to plot bubble chart
function getbubbleChart(id) {
    d3.json(sampleData).then (sampledata =>{
        var resultData = sampledata.samples.filter(data => data.id === id)[0];
               console.log(resultData);
        var traceb={
            x: resultData.otu_ids,
            y:  resultData.sample_values,
            mode: "markers",
            marker: {
                size:resultData.sample_values,
                color: resultData.otu_ids
            },
            text: resultData.otu_labels
        };
         // create data variable
        var datab=[traceb]
        // create layout variable to set plots layout
        var layoutb={
            xaxis:{title: "OTU Ids Vs Samples"},
            height: 600,
            width: 1000
        }
        // Create pie plot using plotly
        Plotly.newPlot("bubble", datab, layoutb);
    });

};

//Function to get Demography data

function getDemoInfo(id){
    d3.json(sampleData).then((data)=> {
        console.log(data)
        var resultData1 =  data.metadata.filter(meta => meta.id.toString() === id)[0];
          
        d3.select("#sample-metadata").html("");
        Object.entries(resultData1).forEach((key) => {   
            d3.select("#sample-metadata")
                .append("h5")
                .text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });

};

//Calling functions when Option change event happens in screen 
function optionChanged(id){
    getpiePlots(id);
    getbarPlots(id);
    getbubbleChart(id);

    getDemoInfo(id);
    buildGauge(id);
};

//Init Function to populate data and plots when the screen comes up first time
function init() {

    // read the data 
    d3.json(sampleData).then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            d3.select("#selDataset")
            .append("option")
            .text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getpiePlots(data.names[0]);    
        getbarPlots(data.names[0]);
        getbubbleChart(data.names[0]);
    
        getDemoInfo(data.names[0]);
        buildGauge(data.names[0]);
    });
};

init();