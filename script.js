let music = new Audio("./0416.mp3")
let contentJo = document.getElementById("content");
let screenSaver = document.getElementById("saver");
let clickUser = false;

document.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() !== "a" && clickUser == false) {
    music.play();
    contentJo.style.display = "none";
    screenSaver.style.display = "flex";
    requestAnimationFrame(renderFrame);
    clickUser = true;
    COUNT = 5;
    SPEED = 1;
  } else {
    contentJo.style.display = "block";
    screenSaver.style.display = "none";
    music.pause();
    clickUser = false;
  }
});

var COUNT = 5;
var SPEED = 1;
var COLOR = "#fff";

var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.strokeStyle = COLOR;
ctx.fillStyle = "rgba(0, 0, 0, 0.05)";

function each(col, func, thisValue) {
  for (var i = 0; i < col.length; i++) {
    func.bind(thisValue || col[i])(col[i]);
  }
}

function Point(x, y) {
  this.x = x;
  this.y = y;
  this.vx = Math.random() * SPEED;
  this.vy = Math.random() * SPEED;
}
Point.prototype.move = function () {
  this.x += this.vx;
  this.y += this.vy;
};

function drawPath(pointArray) {
  ctx.beginPath();
  ctx.moveTo(pointArray[0].x, pointArray[0].y);
  each(pointArray, function () {
    ctx.lineTo(this.x, this.y);
  });
  ctx.lineTo(pointArray[0].x, pointArray[0].y);
  ctx.stroke();
  ctx.closePath();
}

function movePoints(pointArray) {
  each(pointArray, function () {
    this.move();
  });
}

function Boundary(x1, y1, x2, y2) {
  (this.x1 = x1), (this.y1 = y1), (this.x2 = x2), (this.y2 = y2);
}
Boundary.prototype.constrainPoints = function (pointArray) {
  each(
    pointArray,
    function (point) {
      if (point.x < this.x1) {
        point.x = this.x1;
        point.vx *= -1;
      } else if (point.x > this.x2) {
        point.x = this.x2;
        point.vx *= -1;
      }
      if (point.y < this.y1) {
        point.y = this.y1;
        point.vy *= -1;
      } else if (point.y > this.y2) {
        point.y = this.y2;
        point.vy *= -1;
      }
    },
    this
  );
};

function Polygon(points) {
  this.points = points;
}
Polygon.prototype.draw = function () {
  drawPath(this.points);
};

var bounds = new Boundary(0, 0, window.innerWidth, window.innerHeight);

var kites = [];

for (var i = 0; i < COUNT; i++) {
  kites.push(
    new Polygon([
      new Point(100, 100),
      new Point(200, 100),
      new Point(200, 200),
      new Point(100, 200),
    ])
  );
}

function renderFrame() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  each(kites, function () {
    movePoints(this.points);
    bounds.constrainPoints(this.points);
    this.draw();
  });

  requestAnimationFrame(renderFrame);
}

document.addEventListener("click", function (e) {
})
