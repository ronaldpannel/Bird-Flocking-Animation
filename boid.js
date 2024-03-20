class Boid {
  constructor() {
    this.pos = new Vector(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    this.vel = Vector.random2D();
    this.vel.setMag(randomIntFromRange(2, 4));
    this.acc = new Vector(0, 0);
    this.radius = 3;
    this.maxForce = 1;
    this.maxSpeed = 4;
  }
  align(boids) {
    let perceptionRadius = 50;
    let steering = new Vector(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = getDistance(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.vel);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = new Vector(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = getDistance(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.pos);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  separation(boids) {
    let perceptionRadius = 50;
    let steering = new Vector(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = getDistance(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perceptionRadius) {
        let diff = Vector.sub(this.pos, other.pos);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  flock(boids) {
    //this.acc.mult(0);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignmentSlider.value);
    cohesion.mult(cohesionSlider.value);
    separation.mult(separationSlider.value);

    this.acc.add(alignment);
    this.acc.add(cohesion);
    this.acc.add(separation);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
  }
  edges() {
    if (this.pos.x > canvas.width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = canvas.width;
    }
    if (this.pos.y > canvas.height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = canvas.height;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
