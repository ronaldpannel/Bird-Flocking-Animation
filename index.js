/**@type{HTMLCanvasElement} */

// Based on Craig Reynolds flocking three part algorithm
// cohesion, separation and alignment
const cohesionSlider = document.getElementById("cohesionSlider");
const alignmentSlider = document.getElementById("alignSlider");
const separationSlider = document.getElementById("separationSlider");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
const flock = [];

for (let i = 0; i < 500; i++) {
  flock.push(new Boid());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flock.forEach((boid) => {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", (e) => {
  console.log(e);
  window.innerWidth = e.currentTarget.innerWidth;
  window.innerHeight = e.currentTarget.innerHeight;
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
