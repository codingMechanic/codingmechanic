<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div class="skills">
		<div class="skills-chart"></div>
	</div>
	
	<script src="js/d3.v3.min.js"></script>
	<script>
	//Object-Detection für SVG
	if(Modernizr.inlinesvg) {
		//Implementierung des Tortendiagramms
		var width = 200, height = 200, radius = 0.8 * Math.min(width, height) / 2, colors = [ "#7552cc", "#666666", "#f6de60" ];
		//#8A7DB2 #999999 #CCBC7A
		//d3.scale.ordinal(): Constructs a new ordinal scale with an empty domain and an empty range. 
		//The ordinal scale is invalid (always returning undefined) until an output range is specified.
		var color = d3.scale.ordinal().range(colors);
		var textColor = d3.scale.ordinal().range([ charts.dim(colors[0], -0.3), charts.dim(colors[1], -0.4), charts.dim(colors[2], -0.5) ]);
		var initArc = d3.svg.arc().outerRadius(radius/6*5).innerRadius(radius / 3),
			finalArc = d3.svg.arc().outerRadius(radius).innerRadius(radius / 3),
			pie = d3.layout.pie().sort(null).value(function(d) {
				return d.share;
		});
		//füge svg-Tag in Markup ein (d3.select: Verwendung analog zu jQuery wrapped set)
		var svg = d3.select(".skills-chart")
		.append("svg").attr("class", "chart").attr("width", width).attr("height", height)
		.append("g").attr("transform","translate(" + width / 2 + "," + height / 2 + ")");
		//lese csv-Datei aus und setze die Informationen in Grafik um
		d3.csv("content/skills-profile.csv", function(error, data) {
			var legendArray = [];
			data.forEach(function(d) {
				d.share = +d.share;
				legendArray.push(d.legend);
			});

			//füge Legende an Diagramm an
			var legend = d3.select(".skills-chart").append("svg")
		      .attr("class", "legend")
		      .attr("width", radius * 2)
		      .attr("height", radius * 2)
		    .selectAll("g")
		      .data( legendArray )
			//enter(): returns the entering selection: placeholder nodes for each data element for which no corresponding existing DOM element was found in the current selection.
		    .enter().append("g")
		      .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; })
		      .style('opacity', 0);

			  legend.append("rect")
			      .attr("width", 18)
			      .attr("height", 18)
			      .style("fill", color);

			  legend.append("text")
			      .attr("x", 24)
			      .attr("y", 9)
			      .attr("dy", ".35em")
			      .text(function(d) { return d; });
			
			var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
			g.append("path").attr("d", initArc).style("fill", "#efefef");
			g.append("text").attr("transform", function(d) {
				return "translate(" + initArc.centroid(d) + ")";
			}).attr("dy", ".35em").style({
				"opacity" : "0",
				"text-anchor" : "middle",
				"fill" : function(d) {
					return textColor(d.data.caption);
				}
			}).text(function(d) {
				return d.data.caption;
			});
			d3.select(window).on('load', function() {

				var arcs = d3.select('.skills-chart').selectAll(".arc")[0].reverse();
				var captions = d3.select('.skills').select('.legend').selectAll("g")[0].reverse();
				 //verschachtelte timeouts zum sequentiellen Animieren der Tortenstücke
				setTimeout(function tweakSlice() {
					if(arcs.length) {
						
						var arc = d3.select(arcs.pop());
						var caption = d3.select(captions.pop());
						
						arc.select('path')
						.transition()
					    .duration(600)
				        .attr("d", finalArc)
				        .style("fill", function(d) {
							return color(d.data.caption);
		 				})
		 				.ease("elastic"); 
						
						arc.select('text')
						.transition()
					    .duration(600)
				        .style("opacity", "1");
						
						caption.transition()
					    .duration(600)
				        .style("opacity", "1");
						
						setTimeout(tweakSlice, 200);
					}
				}, 0);
				    
			});
		});
	}
	</script>
</body>