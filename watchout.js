// start slingin' some d3 here.

var width = 960,
    height = 500;

var radii = [10, 20, 30, 40, 50];



var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    // .append("g")
    // .attr('left', '200px')
    // .attr('top', '200px');

// var asteroids = d3.select('svg').data(radii)
//     .enter()
//     .append('circle')
//     .attr('fill', 'red')
//     .attr('r', 15)
//     .attr('cx', 125)
//     .attr('cy', 75);

var player = d3.select('svg').append('rect')
    .attr('width', 25).attr('height', 25).attr('fill', 'red').attr('x', 250).attr('y', 50);;


  var asteroids = svg.selectAll("circle")
      .data(radii)
      .enter()
      .append('circle')
      .attr('r', function(d){ return d*Math.floor(Math.random()*3); })
      .attr('fill', 'black')
      .attr('cx', function(d){ return d + Math.floor(Math.random()*width)})
      .attr('cy', function(d){ return d + Math.floor(Math.random()*height)});

function update(data) {
  // DATA JOIN
  // // Join new data with old elements, if any.


  // UPDATE
  // Updating locations
  asteroids.attr("class", "update")
  .transition()
  .attr('r', function(d){ return d*Math.floor(Math.random()*3); })
  .attr('cx', function(d){ return Math.floor(Math.random()*width)})
  .attr('cy', function(d){ return Math.floor(Math.random()*height)});

  // ENTER
  // Create new elements as needed.

  // asteroids.enter().append("circle")
  //     .attr("class", "enter")
  //     .attr("dy", ".35em");

  // // ENTER + UPDATE
  // // Appending to the enter selection expands the update selection to include
  // // entering elements; so, operations on the update selection after appending to
  // // the enter selection will apply to both entering and updating nodes.
  // asteroids.attr("cx", function(d, i) { return i * 32; });

  // // EXIT
  // // Remove old elements as needed.
  // asteroids.exit().remove();
};

// The initial display.
update(radii);
// SVG elem data?
  // radius = [5,10,15,30]
  // cx & cy
  //

// Grab a random sample of letters from the alphabet, in alphabetical order.

  setInterval(function() {
    update(radii);
  }, 1500);




