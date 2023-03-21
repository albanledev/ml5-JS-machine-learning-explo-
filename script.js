let video;
let poseNet;
let pose;
let particles = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  background(0);

  // Add new particles
  if (pose) {
    particles.push(new Particle(pose.nose.x, pose.nose.y));
  }

  // Display and update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    particles[i].update();

    // Remove particles that have faded out
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
    this.size = random(10, 40);
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.color, this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
  }
}