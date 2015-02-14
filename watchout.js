// start slingin' some d3 here.

var width = 960,
    height = 500,
    radius = 15,
    numEnemies = 35;

var enemies = function(numEnemies) {
  var enemyArray = [];
  for (var i = 0; i < numEnemies; i++) {
    enemyArray.push({i : i,
      cx: Math.floor(Math.random()*width),
      cy: Math.floor(Math.random()*height)
    });
  }
  return enemyArray;
}(numEnemies);
console.log("enemies is ", enemies);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    // .append("g")
    // .attr('left', '200px')
    // .attr('top', '200px');

// var asteroids = d3.select('svg').data(enemies)
//     .enter()
//     .append('circle')
//     .attr('fill', 'red')
//     .attr('r', 15)
//     .attr('cx', 125)
//     .attr('cy', 75);

var dragged = d3.behavior.drag().on("drag", function(d) {
  d.cx += d3.event.dx;
  d.cy += d3.event.dy;
  d3.select(this).attr("cx", d.cx).attr("cy", d.cy);
});

var player = svg.selectAll('circle.player').data([{"cx": 100, "cy": 200 }])
    .enter().append('circle')
    .attr('class', 'player')
    .attr('r', 25).attr('fill', 'red')
    .attr('cx', function(d) {
      return d.cx;
    }).attr('cy', function(d) {
      return d.cy;
    })
    .call(dragged)
    .on('click', function() {});


  var asteroids = svg.selectAll("circle.update")
      .data(enemies)
      .enter()
      .append('circle')
      .attr('r', function(d){ return radius; })
      .attr('fill', 'black')
      .attr('cx', function(d){ return d.cx; })
      .attr('cy', function(d){ return d.cy; });

function update(data) {
  // DATA JOIN
  // // Join new data with old elements, if any.


  // UPDATE
  // Updating locations
  asteroids.attr("class", "update")
  .transition()
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
update(enemies);
// SVG elem data?
  // radius = [5,10,15,30]
  // cx & cy
  //

// Grab a random sample of letters from the alphabet, in alphabetical order.

  setInterval(function() {
    update(enemies);
  }, 1500);




