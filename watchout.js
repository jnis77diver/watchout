// start slingin' some d3 here.
var width = 1000,
    height = 750,
    radius = 15,
    // Button to change number/difficulty
    numEnemies = 15,
    playerRadius = 25,
    playerPos,
    duration = 2000,
    easyEnemy = 5,
    mediumEnemy = 15,
    hardEnemy = 30;


d3.select('button.easy').on('click', function(){
  console.log('easy')
  duration = 2000;
});

d3.select('button.medium').on('click', function(){
  duration = 1500;
  numEnemies = 15;
});

d3.select('button.hard').on('click', function(){
  duration = 1000;
  numEnemies = 30;
});

var enemyArray = [];
var enemies = function(numEnemies) {
  for (var i = 0; i < numEnemies; i++) {
    enemyArray.push({i : i,
      'cx': Math.floor(Math.random()*width),
      'cy': Math.floor(Math.random()*height)
    });
  }
  return enemyArray;
};
enemies(numEnemies);

var svg = d3.select("body").append("svg")
    .attr('class', 'board')
    .attr("width", width)
    .attr("height", height);

var dragged = d3.behavior.drag().on("drag", function(d) {
  d.cx += d3.event.dx;
  d.cy += d3.event.dy;

  // playerPos =
  d3.select(this).attr("cx", d.cx).attr("cy", d.cy);
});

var playerData = [{
  "cx": 100,
  "cy": 200
}];

var player = svg.selectAll('circle.player').data(playerData)
    .enter().append('circle')
    .attr('class', 'player')
    .attr('r', playerRadius).attr('fill', 'red')
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


function update(holder) {
  // Update asteroid locations
  asteroids.attr("class", "update")
  .transition().duration(duration)
  .attr('cx', function(d){ return d.cx = Math.floor(Math.random()*width)})
  .attr('cy', function(d){ return d.cy = Math.floor(Math.random()*height)})
  .each('end', function(){
  update(d3.select(this));
  });
};
update(enemies);

var gameStats = {
  score: 0,
  best: 0,
  collisions: 0
};

var updateScore = function() {
  d3.select('#current-score').text(gameStats.score);
  d3.select('#best-score').text(gameStats.best);
};

var collide = function(){
  gameStats.collisions += 1;
  gameStats.score = 0;
  return d3.select('#collision-count').text(gameStats.collisions);
};
var increaseScore = function(){
  gameStats.score += 1;
  gameStats.best = Math.max(gameStats.score, gameStats.best)
  updateScore();
};

setInterval(function(){ return increaseScore(); }, 50);



var preventCollision = false;

var detectCollisions = function(){
  var collision = false;

  asteroids.each(function(d){
    var cx = d3.select(this).attr('cx');
    var cy = d3.select(this).attr('cy');


    var playerX = d3.select('circle.player').attr('cx');
    var playerY = d3.select('circle.player').attr('cy');


    var x = cx - playerX;
    var y = cy - playerY;
    if(Math.sqrt(x*x + y*y)<(radius + playerRadius)){
      collision = true;
    }
  });

  if(collision){
    if(preventCollision != collision){
      collide();
    }
  }
  preventCollision = collision;


};
d3.timer(detectCollisions);
// setInterval(detectCollisions, 25)

