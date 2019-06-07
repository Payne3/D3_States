// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 960;

// Define the chart's margins as an object
var chartMargin = {
    top: 70,
    right: 70,
    bottom: 70,
    left: 70
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.bottom})`);

d3.csv("assets/data.csv").then(function (data) {

    // Log an error if one exists
    // if (error) throw error;

    // Print the Data
    console.log(data);

    data.forEach(function (elements) {
        elements.poverty = +elements.poverty;
        elements.healthcare = +elements.healthcare;
        // console.log(elements.poverty);


    });


    // Configure a time scale with a range between 0 and the chartWidth
    // Set the domain for the xTimeScale function
    // d3.extent returns the an array containing the min and max values for the property specified
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain( [d3.min(data,elements=> elements.poverty), d3.max(data, elements => elements.poverty)]);

    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([d3.min(data,elements=> elements.healthcare), d3.max(data, elements => elements.healthcare)]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yLinearScale);



    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    



    var circles = chartGroup.selectAll("circle").data(data).enter();

    var c = circles
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", elements => xScale(elements.healthcare))
        .attr("cy", elements => yLinearScale(elements.poverty))
        .attr("r", "15")
        .attr("opacity", ".5");

    //Create text labels with state abbreviation for each circle
    circles.append("text")
        .classed("stateText", true)
        .attr("x", elements => xScale(elements.healthcare))
        .attr("y", elements => yLinearScale(elements.poverty))
        .attr("stroke", "teal")
        .attr("font-size", "12px")
        .text(elements => elements.abbr)


   
});