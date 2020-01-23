var buttons = false;

function resize_body_padding() {
    if (buttons == false){
        buttons = true;
        $("body").css("padding-top", 125);
    }
    else if(buttons == true){
        buttons = false;
        $("body").css("padding-top", 70);
    }
}




function potegni() {
  var dejavnostt = document.getElementById("myInput").value;
	getJSON("http://localhost:9200/neto_bruto/_search?&size=999", dejavnostt).then(resp => {
        console.log(resp.hits.hits);
		
      });
	
}


async function getJSON(theUrl, dejavnostt){
  data = {
    "query": {
          "bool": {
            "must": [
              { "match": {
				  DEJAVNOST: dejavnostt.toString()
				  }
				}
              ]
            }
          }
        }

  const response = await fetch(theUrl, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrer: 'no-referrer',
  body: JSON.stringify(data)
  });
  return await response.json();
  }


function drawBruto(){
  var width = document.getElementById("c2").clientWidth;
var height = document.getElementById("c2").clientHeight;
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60};

width = widthClient - margin.left - margin.right;
height = heightClient - margin.top - margin.bottom;

// Parse the Data
d3.csv("aa.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.BRUTO_PLACA - b.BRUTO_PLACA;
  });

  // X axis
  var xScale = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.DEJAVNOST; }))
    .padding(0.2);

  // Add Y axis
  var yScale = d3.scaleLinear()
    .domain([0, 3300])
    .range([ height, 0]);

  var svg2 = d3.select("#chart2")

  var chart2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var makeYLines = () => d3.axisLeft()
    .scale(yScale)

    chart2.append("g")
    .call(d3.axisLeft(yScale));

  chart2.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )



  var barsGroups2 = chart2.selectAll()
    .data(data)
    .enter()
    .append("g")


  barsGroups2
    .append("rect")
    .attr("class", "bar2")
      .attr("x", function(d) { return xScale(d.DEJAVNOST); })
      .attr("y", function(d) { return yScale(d.BRUTO_PLACA); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.BRUTO_PLACA); })
      .on("mouseenter", function(actual, i) {
        d3.select(".value2")
          .attr("opacity", 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 0.6)
          .attr("x", function(a) { return xScale(a.DEJAVNOST)-3; })
          .attr("width", xScale.bandwidth()+5)
            

        var y = yScale(actual.BRUTO_PLACA);

        line = chart2.append("line")
          .attr("id", "limit2")
          .attr("x1", 0)
          .attr("y1", y)
          .attr("x2", width)
          .attr("y2", y)

           
  
        barsGroups2.append("text")
          .attr("class", "divergence2")
          .attr("x", function(a) { return xScale(a.DEJAVNOST) + xScale.bandwidth() / 2; })
          .attr("y", function(a) { return yScale(a.BRUTO_PLACA) + 30; })
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            var divergence = (a.BRUTO_PLACA - actual.BRUTO_PLACA).toFixed(1);

            let text="";
            if(divergence > 0){
              text += "+";
            }
            text += divergence;

            return idx != i ? text : "";
          })
        })
      .on("mouseleave", function() {
        d3.selectAll(".value2")
        .attr("opacity", 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 1)
          .attr("x", function(a) { return xScale(a.DEJAVNOST); })
          .attr("width", xScale.bandwidth())

        chart2.selectAll("#limit2").remove()
        chart2.selectAll(".divergence2").remove()
      })

      barsGroups2
        .append("text")
        .attr("class", "value2")
        .attr("x", function(a) { return xScale(a.DEJAVNOST) + xScale.bandwidth() / 2; })
        .attr("y", function(a) { return yScale(a.BRUTO_PLACA) + 30; })
        .attr('text-anchor', 'middle')
        .text((a) => a.BRUTO_PLACA)

      svg2
        .append("text")
        .attr("class", "label2")
        .attr('x', -(height/2))
        .attr('y', height/20)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Plača v €')

      svg2
        .append("text")
        .attr("class", "label2")
        .attr('x', width / 2 + margin)
        .attr('y', height - margin * 2)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Dejavnosti')

      svg2
        .append("text")
        .attr("class", "title2")
        .attr('x', (width+10)/2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Povprečne bruto plače')

      svg2
        .append("text")
        .attr("class", "source2")
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'start')
        .text('Vir: Stat.si, 2018')


  })
}



function drawNeto(){
  var width = document.getElementById("c1").clientWidth;
var height = document.getElementById("c1").clientHeight;
// set the dimensions and margins of the graph
var margin = {top: 100, right: 100, bottom: 100, left: 100};
width = widthClient - margin.left - margin.right;
height = heightClient - margin.top - margin.bottom;

var svg1 = d3.select("#chart1");

// Parse the Data
d3.csv("aa.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.NETO_PLACA - b.NETO_PLACA;
  });

  // X axis
  var xScale = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.DEJAVNOST; }))
    .padding(0.2);


  // Add Y axis
  var yScale = d3.scaleLinear()
    .domain([0, 3300])
    .range([ height, 0]);

  
svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-30)")
      .style("text-anchor", "end");


  var chart1 = svg1.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var makeYLines = () => d3.axisLeft()
    .scale(yScale)

    chart1.append("g")
    .call(d3.axisLeft(yScale));

  chart1.append('g')
      .attr('class', 'grid1')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )



  var barsGroups1 = chart1.selectAll()
    .data(data)
    .enter()
    .append("g")


  barsGroups1
    .append("rect")
    .attr("class", "bar1")
      .attr("x", function(d) { return xScale(d.DEJAVNOST); })
      .attr("y", function(d) { return yScale(d.NETO_PLACA); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.NETO_PLACA); })
      .on("mouseenter", function(actual, i) {
        d3.select(".value1")
          .attr("opacity", 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 0.6)
          .attr("x", function(a) { return xScale(a.DEJAVNOST)-3; })
          .attr("width", xScale.bandwidth()+5)
            

        var y = yScale(actual.NETO_PLACA);

        line = chart1.append("line")
          .attr("id", "limit1")
          .attr("x1", 0)
          .attr("y1", y)
          .attr("x2", width)
          .attr("y2", y)

           
  
        barsGroups1.append("text")
          .attr("class", "divergence1")
          .attr("x", function(a) { return xScale(a.DEJAVNOST) + xScale.bandwidth() / 2; })
          .attr("y", function(a) { return yScale(a.NETO_PLACA) + 30; })
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            var divergence = (a.NETO_PLACA - actual.NETO_PLACA).toFixed(1);

            let text="";
            if(divergence > 0){
              text += "+";
            }
            text += divergence;

            return idx != i ? text : "";
          })
        })
      .on("mouseleave", function() {
        d3.selectAll(".value1")
        .attr("opacity", 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 1)
          .attr("x", function(a) { return xScale(a.DEJAVNOST); })
          .attr("width", xScale.bandwidth())

        chart1.selectAll("#limit1").remove()
        chart1.selectAll(".divergence1").remove()
      })

      barsGroups1
        .append("text")
        .attr("class", "value1")
        .attr("x", function(a) { return xScale(a.DEJAVNOST) + xScale.bandwidth() / 2; })
        .attr("y", function(a) { return yScale(a.NETO_PLACA) + 30; })
        .attr('text-anchor', 'middle')
        .text((a) => a.NETO_PLACA)

      svg1
        .append("text")
        .attr("class", "label1")
        .attr('x', -(height/2))
        .attr('y', height/20)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Plača v €')

      svg1
        .append("text")
        .attr("class", "label1")
        .attr('x', width / 2 + margin)
        .attr('y', height - margin * 2)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Dejavnosti')

      svg1
        .append("text")
        .attr("class", "title1")
        .attr('x', (width+10)/2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Povprečne neto plače')

      svg1
        .append("text")
        .attr("class", "source1")
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'start')
        .text('Vir: Stat.si, 2018')


  })
}