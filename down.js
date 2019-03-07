var gradesP = d3.json("gradeData.json");

gradesP.then(function(data)
{
  drawGraph(data);
},
function(err)
{
  console.log(err);
})

var drawGraph = function(data)
{
  var screen = {
    width: 500,
    height: 400
  }
  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height)
  var margins = {
    top:10,
    bottom:40,
    left:10,
    right:100
  }

var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

//scales go here
var xScale = d3.scaleLinear()
              .domain([0,20])
              .range([0,width]);
var yScale = d3.scaleLinear()
              .domain([0,100])
              .range([height,0]);

var colors = d3.scaleOrdinal(d3.schemeAccent);

//plot Land
var plotLand = svg.append("g")
                  .classed("plot",true)
                  .attr("transform","translate("+ margins.left + "," + margins.top+")");


var students = plotLand.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("fill",function(d){return colors(d.colors)});

students.selectAll("circle")
        .data(function(d){return d.grades})
        .enter()
        .append("circle")
        .attr("cx",function(d,i){return xScale(i)})
        .attr("cy",function(d){return yScale(d)})
        .attr("r",10)
 //The Legend...
var legend = svg.append("legend")
                .classed("legend",true)
                .attr("transform","translate("+(width+margins.left)+","+margins.top+")");

var legendLines = legend.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .classed("legendLine",true)
                        .attr("transform",function(d,i){return "translate(0,"+i*12+")";})

legendLines.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("height",10)
            .attr("width",10)
            .attr("fill",function(d){return colors(d.name);})

legendLines.append("text")
            .attr("x",20)
            .attr("y",10)
            .text(function(d){return d.name})

var xAxis = d3.axisBottom(xScale);

svg.append("g").classed("xAxis",true)
    .call(xAxis)
    .attr("transform","translate("+margins.left+","+(margins.top+height+10)+")")

}
