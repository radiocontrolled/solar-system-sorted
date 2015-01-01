
/* 
 * by Alison Benjamin 
 * http://benj.info
 */

var height,
	width, 
	planetaryData,
	solarSystem,
	radiusScale,
	radiuses = [],
	saturn,
	labels,
	planets,
	saturnRings,
	sort,
	descending = document.getElementById("descending"),
	sortDescending,
	ascending = document.getElementById("ascending"),
	sortAscending,
	reset = document.getElementById("reset");
	

var getViewportDimensions = function(){	
	width = document.getElementById("planets").offsetWidth;	
	height = window.innerHeight/2; 
}();


solarSystem = d3.selectAll("#planets")
	.append("svg")
	.attr({
		"width": width + "px",
		"height": height + "px"
	});




var visualise = function(planetaryData, height){
	
	planets = solarSystem.selectAll("g.planet")
		.data(planetaryData)
		.enter()
		.append("g")
		.classed("planet", true);
	
	planets.append("circle")
		.attr({
			"r": function(d) {
				return radiusScale(d["Equatorial radius (KM)"]);
			},
			"cy": function(d){
				return 90;
			},
			"cx": function(d,i){
				return ((width * 0.99) / radiuses.length) * i + 50;
			},
			"fill": "#333",
			"class": function(d, i){
				return d.Planet;
			}
			
		});
	
	
	labels = solarSystem.selectAll("g.planetName")
		.data(planetaryData)
		.enter()
		.append("g")
		.classed("planetName", true)
		.attr({
			"id": function(d){
				return d.Planet;
			},
			"transform": "translate(0,5)"
		});
		
	labels
		.append("text")
		.text(function(d){
			return d.Planet;
		})
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * i + 50;
			},
			"y": function(d){
				return 200;
			},
			"fill": "#333",
			"text-anchor": "middle"
		});
	

	// give Saturn its rings, represented by a rect. 
	saturnRings = solarSystem.select("#Saturn")
		.append("rect")
		.classed("saturnRings",true)
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * 5 - (radiusScale(saturn["Equatorial radius (KM)"]/3));
			},
			"y": 86,
			"rx":30, 
			"ry":30,
			"fill":"#333",
			"height":5,
			"width": function(){
				 return radiusScale(saturn["Equatorial radius (KM)"]) * 3.1 ;

			}});
};
		
sortDescending = function(){
	
	
	planets
		.sort(function(a,b){
			return d3.descending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);	
		})
		.transition()
		.duration(1500)
		.select("circle")
		.attr("cx", function(d,i){
			return ((width * 0.99) / radiuses.length) * i + 50;	
		});
	
	
	saturnRings
		.sort(function(a, b) {
			return d3.descending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);					
		})
		.transition()
		.duration(1500)
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length)  - (radiusScale(saturn["Equatorial radius (KM)"]/3));			
			}
		});
	

	labels
		.sort(function(a, b) {
			return d3.descending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);		
		})
		.transition()
		.duration(1500)
		.select("text")
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * i + 50;
			}
		});
	
};



sortAscending = function(){
	planets
		.sort(function(a,b){
			return d3.ascending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);	
		})
		.transition()
		.duration(1500)
		.select("circle")
		.attr("cx", function(d,i){
			return ((width * 0.99) / radiuses.length) * i + 50;	
		});
	
	saturnRings
		.sort(function(a, b) {
			return d3.ascending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);		
		})
		.transition()
		.duration(1500)
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * 6 - (radiusScale(saturn["Equatorial radius (KM)"]/3));
			}
		});

	labels
		.sort(function(a, b) {
			return d3.ascending(a["Equatorial radius (KM)"], b["Equatorial radius (KM)"]);		
		})
		.transition()
		.duration(1500)
		.select("text")
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * i + 50;
			}
		});
};

var resetPlanets = function(){
	planets
		.sort(function(a,b){
			return d3.ascending(a["Mean distance from Sun (AU)"], b["Mean distance from Sun (AU)"]);	
		})
		.transition()
		.duration(1500)
		.select("circle")
		.attr("cx", function(d,i){
			return ((width * 0.99) / radiuses.length) * i + 50;	
		});
	
	saturnRings
		.sort(function(a, b) {
			return d3.ascending(a["Mean distance from Sun (AU)"], b["Mean distance from Sun (AU)"]);		
		})
		.transition()
		.duration(1500)
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * 5 - (radiusScale(saturn["Equatorial radius (KM)"]/3));
			}
		});

	labels
		.sort(function(a, b) {
			return d3.ascending(a["Mean distance from Sun (AU)"], b["Mean distance from Sun (AU)"]);		
		})
		.transition()
		.duration(1500)
		.select("text")
		.attr({
			"x": function(d,i){
				return ((width * 0.99) / radiuses.length) * i + 50;
			}
		});
		
	
};

// request data 
d3.json("planets.json", function(error, data) {

  if(data) {
 	 planetaryData = data; 
 	 
 	 for(var key in planetaryData){
		if(planetaryData.hasOwnProperty(key)){
			radiuses.push(planetaryData[key]["Equatorial radius (KM)"]);
			if(planetaryData[key].Planet == "Saturn"){
				saturn = planetaryData[key];
			}
		}
	}
	
	radiusScale = d3.scale.linear()
		.domain([d3.min(radiuses),d3.max(radiuses)])
		.range([d3.min(radiuses)/1500,d3.max(radiuses)/1500]);
 	 
 	 visualise(planetaryData, height);
  }
  
  else if(error) {
  	console.log(error);
  }
  
});

/* 
 * event listeners
 */

// click 
descending.addEventListener("click", sortDescending);
ascending.addEventListener("click", sortAscending);
reset.addEventListener("click", resetPlanets);

	
// keyboard 
descending.addEventListener("keydown", function(e){
	var key = e.which || e.keyCode;
	if(key == 13 || key == 32){
		sortDescending();
	}
});

ascending.addEventListener("keydown", function(e){
	var key = e.which || e.keyCode;
	if(key == 13 || key == 32){
		sortAscending();
	}
});
		
reset.addEventListener("keydown", function(e){
	var key = e.which || e.keyCode;
	if(key == 13 || key == 32){
		resetPlanets();
	}
});
		